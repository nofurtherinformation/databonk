'use strict';var _documentCurrentScript=typeof document!=='undefined'?document.currentScript:null;var p=`
;(function workerMain() {
  var isNode = (
    typeof process !== 'undefined' &&
    typeof process.versions === 'object' &&
    typeof process.versions.node === 'string'
  );

  /* Capture 'require' via a typeof guard so that the literal text
   * 'require(' never appears in this file \u2014 packaging tools like publint
   * use a regex heuristic (require\\s*\\() to classify CJS vs ESM, and a
   * false-positive here would misclassify the ESM workers bundle.
   * The guard is safe: in a Node.js eval worker this is always a function;
   * in a browser worker it is undefined and the isNode guard short-circuits. */
  var _workerRequire = typeof require === 'function' ? require : null;

  var wasm = null; /* WebAssembly exports, set on 'init' */

  /* ------------------------------------------------------------------ */
  /* send a message back to the main thread                               */
  /* ------------------------------------------------------------------ */
  function send(msg) {
    if (isNode) {
      _workerRequire('worker_threads').parentPort.postMessage(msg);
    } else {
      /* global postMessage available in browser Worker scope */
      postMessage(msg);
    }
  }

  /* ------------------------------------------------------------------ */
  /* message handler                                                      */
  /* ------------------------------------------------------------------ */
  function handle(msg) {
    var type = msg.type;
    var requestId = msg.requestId;

    /* ---- init: receive wasm bytes + shared memory, instantiate ---- */
    if (type === 'init') {
      var bytes = msg.bytes;
      /* Accept Uint8Array or ArrayBuffer */
      var src = (bytes instanceof Uint8Array) ? bytes.buffer : bytes;
      WebAssembly
        .instantiate(src, { env: { memory: msg.memory } })
        .then(function(r) {
          wasm = r.instance.exports;
          /* Workers NEVER call __wasm_init_memory \u2014 only the main thread does.
           * All our static-mut arena variables are zero-initialised (BSS),
           * so the shared linear memory already contains the correct values
           * written by the main thread's instantiation. */
          send({ type: 'ready', requestId: requestId });
        })
        .catch(function(e) {
          send({ type: 'error', requestId: requestId, error: String(e) });
        });
      return;
    }

    if (!wasm) {
      send({ type: 'error', requestId: requestId, error: 'worker not initialised' });
      return;
    }

    /* ---- kernel: single wasm kernel call, returns one number ---- */
    if (type === 'kernel') {
      try {
        var result = wasm[msg.fn].apply(null, msg.args);
        send({ type: 'result', requestId: requestId, value: +result });
      } catch(e) {
        send({ type: 'error', requestId: requestId, error: String(e) });
      }
      return;
    }

    /* ---- meta: batch of kernel calls, returns one number per op ---- */
    if (type === 'meta') {
      try {
        var ops = msg.ops;
        var values = new Array(ops.length);
        for (var i = 0; i < ops.length; i++) {
          values[i] = +wasm[ops[i].fn].apply(null, ops[i].args);
        }
        send({ type: 'values', requestId: requestId, values: values });
      } catch(e) {
        send({ type: 'error', requestId: requestId, error: String(e) });
      }
      return;
    }
  }

  /* ------------------------------------------------------------------ */
  /* wire up message listener                                             */
  /* ------------------------------------------------------------------ */
  if (isNode) {
    _workerRequire('worker_threads').parentPort.on('message', handle);
  } else {
    /* browser Web Worker */
    self.onmessage = function(e) { handle(e.data); };
  }
})();
`;var v=typeof process<"u"&&typeof process.versions=="object"&&typeof process.versions.node=="string";async function g(){if(v){let{Worker:t}=await import('worker_threads');return new t(p,{eval:true})}let u=new Blob([p],{type:"text/javascript"}),e=URL.createObjectURL(u),r=new Worker(e);return URL.revokeObjectURL(e),r}function w(u,e){v&&typeof u.on=="function"?u.on("message",e):u.onmessage=r=>e(r.data);}var b=class u{memory;wasmBytes;timeoutMs;slots=[];nextId=1;nextSlot=0;terminated=false;constructor(e,r,t){this.memory=e,this.wasmBytes=r,this.timeoutMs=t;}static async create(e,r,t,n=3e4){let s=new u(r,e,n),o=[];for(let i=0;i<t;i++)o.push(s.addWorker());return await Promise.all(o),s}async addWorker(){let e=await g(),r=new Map,t={raw:e,pending:r};return this.slots.push(t),w(e,n=>this.handleMessage(t,n)),new Promise((n,s)=>{let o=this.nextId++;r.set(o,{resolve:()=>n(),reject:s,timer:null}),e.postMessage({type:"init",requestId:o,bytes:this.wasmBytes,memory:this.memory});})}handleMessage(e,r){if(typeof r!="object"||r===null)return;let t=r,n=t.requestId,s=e.pending.get(n);s&&(e.pending.delete(n),s.timer!==null&&clearTimeout(s.timer),t.type==="error"?s.reject(new Error(String(t.error))):s.resolve(r));}async sendKernel(e,r){let t=this.slots[this.nextSlot%this.slots.length];this.nextSlot++;let n=this.nextId++;return (await this.sendToSlot(t,n,{type:"kernel",requestId:n,fn:e,args:r})).value}async sendMeta(e){let r=this.slots[this.nextSlot%this.slots.length];this.nextSlot++;let t=this.nextId++;return (await this.sendToSlot(r,t,{type:"meta",requestId:t,ops:e})).values}async broadcastKernel(e){let r=Math.min(e.length,this.slots.length),t=[];for(let n=0;n<r;n++){let{fn:s,args:o}=e[n],i=this.slots[n],a=this.nextId++;t.push(this.sendToSlot(i,a,{type:"kernel",requestId:a,fn:s,args:o}).then(l=>l.value));}return Promise.all(t)}async broadcastMeta(e){let r=Math.min(e.length,this.slots.length),t=[];for(let n=0;n<r;n++){let s=e[n],o=this.slots[n],i=this.nextId++;t.push(this.sendToSlot(o,i,{type:"meta",requestId:i,ops:s}).then(a=>a.values));}return Promise.all(t)}sendToSlot(e,r,t){return new Promise((n,s)=>{let o=null;this.timeoutMs>0&&(o=setTimeout(()=>{e.pending.delete(r),this.replaceSlot(e).catch(()=>{}),s(new Error(`kernel worker timed out (${this.timeoutMs} ms)`));},this.timeoutMs)),e.pending.set(r,{resolve:n,reject:s,timer:o}),e.raw.postMessage(t);})}async replaceSlot(e){try{e.raw.terminate();}catch{}let r=this.slots.indexOf(e);if(r===-1)return;for(let[,o]of e.pending)o.timer!==null&&clearTimeout(o.timer),o.reject(new Error("worker replaced after crash/timeout"));e.pending.clear();let t=await g(),n={raw:t,pending:new Map};w(t,o=>this.handleMessage(n,o)),this.slots[r]=n;let s=this.nextId++;await new Promise((o,i)=>{n.pending.set(s,{resolve:()=>o(),reject:i,timer:null}),t.postMessage({type:"init",requestId:s,bytes:this.wasmBytes,memory:this.memory});});}get size(){return this.slots.length}terminate(){if(!this.terminated){this.terminated=true;for(let e of this.slots){for(let[,r]of e.pending)r.timer!==null&&clearTimeout(r.timer),r.reject(new Error("pool terminated"));e.pending.clear();try{e.raw.terminate();}catch{}}this.slots.length=0;}}};var k=typeof process<"u"&&typeof process.versions=="object"&&typeof process.versions.node=="string";function P(){return typeof SharedArrayBuffer>"u"?false:k?true:typeof crossOriginIsolated<"u"&&crossOriginIsolated===true}async function x(u,e){if(k){let[{readFile:s},{fileURLToPath:o}]=await Promise.all([import('fs/promises'),import('url')]),i;if(e===void 0)i=o(new URL(u,(typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('workers.cjs', document.baseURI).href))));else if(e instanceof URL)i=o(new URL(u,e));else if(e.startsWith("file:"))i=o(new URL(u,e));else {let{join:m}=await import('path');i=m(e,u);}let a=await s(i),l=a.buffer.slice(a.byteOffset,a.byteOffset+a.byteLength);return new Uint8Array(l)}let r=e??new URL(".",(typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('workers.cjs', document.baseURI).href))),t=new URL(u,r),n=await fetch(t);if(!n.ok)throw new Error(`Failed to fetch ${t}: ${n.status}`);return new Uint8Array(await n.arrayBuffer())}function c(u,e){if(u===0||e<=0)return [];let r=Math.ceil(u/e),t=Math.ceil(r/8)*8,n=[];for(let s=0;s<u;s+=t)n.push([s,Math.min(s+t,u)]);return n}var f=class{constructor(e,r,t){this.pool=e;this.exports=r.exports,this.memory=t;}pool;enabled=true;memory;exports;get workers(){return this.pool.size}alloc(e){let r=this.exports.alloc(e);if(r===0)throw new Error(`threads wasm OOM allocating ${e} bytes`);return r}free(e){this.exports.free(e);}callKernel(e,...r){let t=this.exports[e];if(typeof t!="function")throw new Error(`kernel not found: ${e}`);return t(...r)}async sumF64(e,r,t){let n=c(t,this.pool.size);if(n.length===0)return 0;if(n.length===1)return this.pool.sendKernel("sum_f64_null",[e,r,t]);let s=n.map(([a,l])=>({fn:"sum_f64_null",args:[e+a*8,r===0?0:r+(a>>3),l-a]})),o=await this.pool.broadcastKernel(s),i=0;for(let a of o)i+=a;return i}async meanF64(e,r,t){let n=c(t,this.pool.size);if(n.length===0)return NaN;if(n.length===1)return this.pool.sendKernel("mean_f64_null",[e,r,t]);let s=n.map(([l,m])=>{let d=e+l*8,h=r===0?0:r+(l>>3),y=m-l;return [{fn:"sum_f64_null",args:[d,h,y]},{fn:"count_null",args:[h,y]}]}),o=await this.pool.broadcastMeta(s),i=0,a=0;for(let[l,m]of o)i+=l,a+=m;return a===0?NaN:i/a}async minF64(e,r,t){let n=c(t,this.pool.size);if(n.length===0)return NaN;if(n.length===1)return this.pool.sendKernel("min_f64_null",[e,r,t]);let s=n.map(([i,a])=>({fn:"min_f64_null",args:[e+i*8,r===0?0:r+(i>>3),a-i]})),o=await this.pool.broadcastKernel(s);return M(o)}async maxF64(e,r,t){let n=c(t,this.pool.size);if(n.length===0)return NaN;if(n.length===1)return this.pool.sendKernel("max_f64_null",[e,r,t]);let s=n.map(([i,a])=>({fn:"max_f64_null",args:[e+i*8,r===0?0:r+(i>>3),a-i]})),o=await this.pool.broadcastKernel(s);return _(o)}addF64(e,r,t,n){return this.parallelElementwiseBinary("add_f64",e,r,t,n,8)}subF64(e,r,t,n){return this.parallelElementwiseBinary("sub_f64",e,r,t,n,8)}mulF64(e,r,t,n){return this.parallelElementwiseBinary("mul_f64",e,r,t,n,8)}async parallelElementwiseBinary(e,r,t,n,s,o){let i=c(s,this.pool.size);if(i.length===0)return;if(i.length===1){await this.pool.sendKernel(e,[r,t,n,s]);return}let a=i.map(([l,m])=>{let d=l*o;return {fn:e,args:[r+d,t+d,n+d,m-l]}});await this.pool.broadcastKernel(a);}async parallelReduce(e,r,t,n,s){let o=c(n,this.pool.size);if(o.length===0)return [];let i=o.map(([a,l])=>({fn:e,args:[r+a*s,t===0?0:t+(a>>3),l-a]}));return this.pool.broadcastKernel(i)}terminate(){this.pool.terminate();}};function M(u){let e=NaN;for(let r of u)Number.isNaN(r)||(e=Number.isNaN(e)?r:Math.min(e,r));return e}function _(u){let e=NaN;for(let r of u)Number.isNaN(r)||(e=Number.isNaN(e)?r:Math.max(e,r));return e}async function S(u={}){if(!P())return console.warn("[databonk] enableThreads: SharedArrayBuffer is not available or cross-origin isolation is missing (COOP/COEP headers required in browsers). Parallel mode not activated. See docs/threads.md for setup instructions."),false;let e=u.workers??4,r=u.timeoutMs??3e4,t=u.initialPages??32,n=u.maxPages??16384,s=await x("simd-threads.wasm",u.wasmDir),o=new WebAssembly.Memory({initial:t,maximum:n,shared:true}),i=await WebAssembly.compile(s.buffer),a=await WebAssembly.instantiate(i,{env:{memory:o}}),l=a.exports;typeof l.__wasm_init_memory=="function"&&l.__wasm_init_memory();let m=await b.create(s,o,e,r);return new f(m,a,o)}exports.KernelWorkerPool=b;exports.enableThreads=S;exports.splitChunks=c;//# sourceMappingURL=workers.cjs.map
//# sourceMappingURL=workers.cjs.map