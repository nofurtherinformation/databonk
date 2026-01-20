export class PerformanceTimer {
  private startTime: number = 0;
  private measurements: Map<string, number> = new Map();

  start(): void {
    this.startTime = performance.now();
  }

  end(label: string): number {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    this.measurements.set(label, duration);
    return duration;
  }

  measure<T>(label: string, fn: () => T): T {
    this.start();
    const result = fn();
    this.end(label);
    return result;
  }

  async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start();
    const result = await fn();
    this.end(label);
    return result;
  }

  getMeasurement(label: string): number | undefined {
    return this.measurements.get(label);
  }

  getAllMeasurements(): Record<string, number> {
    return Object.fromEntries(this.measurements);
  }

  formatTime(ms: number): string {
    if (ms < 1) {
      return `${(ms * 1000).toFixed(2)}μs`;
    } else if (ms < 1000) {
      return `${ms.toFixed(2)}ms`;
    } else {
      return `${(ms / 1000).toFixed(2)}s`;
    }
  }

  printSummary(): void {
    console.log('\n=== Performance Summary ===');
    for (const [label, time] of this.measurements) {
      console.log(`${label}: ${this.formatTime(time)}`);
    }
    
    const total = Array.from(this.measurements.values()).reduce((sum, time) => sum + time, 0);
    console.log(`Total: ${this.formatTime(total)}`);
    console.log('============================\n');
  }

  reset(): void {
    this.measurements.clear();
    this.startTime = 0;
  }
}

export class DataGenerator {
  private static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static randomFloat(min: number, max: number, decimals: number = 2): number {
    return Math.round((Math.random() * (max - min) + min) * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  static generatePopulationData(count: number): Array<{
    id: number;
    population1: number;
    population2: number;
    population3: number;
  }> {
    const data = new Array(count);
    
    for (let i = 0; i < count; i++) {
      data[i] = {
        id: i + 1,
        population1: this.randomInt(1000, 100000),
        population2: this.randomInt(500, 75000),
        population3: this.randomInt(200, 50000)
      };
    }
    
    return data;
  }

  static generateCategoryData(populationCount: number): Array<{
    id: number;
    category: string;
  }> {
    const categories = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const data = new Array(populationCount);
    
    for (let i = 0; i < populationCount; i++) {
      data[i] = {
        id: i + 1,
        category: categories[i % categories.length]
      };
    }
    
    return data;
  }

  static generateLargeDataset(
    populationRows: number,
    options: {
      includeNulls?: boolean;
      nullPercentage?: number;
      skewCategories?: boolean;
    } = {}
  ): {
    populationData: ReturnType<typeof DataGenerator.generatePopulationData>;
    categoryData: ReturnType<typeof DataGenerator.generateCategoryData>;
  } {
    const { includeNulls = false, nullPercentage = 0.1, skewCategories = false } = options;
    
    let populationData = this.generatePopulationData(populationRows);
    let categoryData = this.generateCategoryData(populationRows);

    // Add nulls if requested
    if (includeNulls) {
      const nullCount = Math.floor(populationRows * nullPercentage);
      for (let i = 0; i < nullCount; i++) {
        const randomIndex = Math.floor(Math.random() * populationRows);
        if (Math.random() < 0.33) populationData[randomIndex].population1 = 0;
        if (Math.random() < 0.33) populationData[randomIndex].population2 = 0;
        if (Math.random() < 0.33) populationData[randomIndex].population3 = 0;
      }
    }

    // Skew categories toward certain letters if requested
    if (skewCategories) {
      const popularCategories = ['a', 'b', 'c', 'd', 'e'];
      for (let i = 0; i < populationRows; i++) {
        if (Math.random() < 0.6) { // 60% chance of popular category
          categoryData[i].category = popularCategories[Math.floor(Math.random() * popularCategories.length)];
        }
      }
    }

    return { populationData, categoryData };
  }
}

export class MemoryProfiler {
  private initialMemory: number = 0;

  start(): void {
    // Force garbage collection if available (requires --expose-gc flag in Node.js)
    if (typeof global !== 'undefined' && (global as any).gc) {
      (global as any).gc();
    }
    
    this.initialMemory = this.getMemoryUsage();
  }

  getMemoryUsage(): number {
    if (typeof window !== 'undefined' && (window.performance as any).memory) {
      return (window.performance as any).memory.usedJSHeapSize;
    } else if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().heapUsed;
    }
    return 0;
  }

  getCurrentUsage(): number {
    return this.getMemoryUsage() - this.initialMemory;
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  end(): string {
    const currentUsage = this.getCurrentUsage();
    return this.formatBytes(currentUsage);
  }
}