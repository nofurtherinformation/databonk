# Docker Development Environment

This document describes how to use Docker for developing Databonk.js.

## Quick Start

```bash
# Build and start development environment
make docker-dev

# Or using docker-compose directly
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## Available Services

### Main Services

- **app**: Main development service with hot reload
- **test**: Run tests once
- **build**: Build production bundle
- **lint**: Run ESLint
- **typecheck**: Run TypeScript type checking

### Development Services

- **test-watch**: Run tests in watch mode
- **dev-server**: HTTP server for examples (port 8081)
- **postgres**: PostgreSQL database for testing (optional)

## Docker Commands

### Using Make (Recommended)

```bash
make docker-build      # Build Docker images
make docker-dev        # Start development environment
make docker-test       # Run tests
make docker-lint       # Run linter
make docker-typecheck  # Run TypeScript checking
make docker-shell      # Open shell in container
make docker-clean      # Clean containers and images
make docker-reset      # Reset entire Docker environment
```

### Using Docker Compose

```bash
# Development
docker-compose up                    # Start basic services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up  # Full dev environment

# Run individual services
docker-compose run --rm test        # Run tests once
docker-compose run --rm lint        # Run linter
docker-compose run --rm build       # Build for production

# Interactive shell
docker-compose run --rm app sh
```

## Development Workflow

### 1. Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd databonk

# Build Docker images
make docker-build
```

### 2. Development

```bash
# Start development environment with hot reload
make docker-dev
```

This will:
- Start the main development service
- Mount your source code as a volume
- Enable hot reloading for code changes
- Start the example server on port 8081

### 3. Testing

```bash
# Run tests once
make docker-test

# Run tests in watch mode
docker-compose run --rm test-watch
```

### 4. Building

```bash
# Build production bundle
docker-compose run --rm build

# The built files will be in ./dist/
```

## File Structure

```
databonk/
├── Dockerfile                 # Main Docker image
├── docker-compose.yml        # Base services
├── docker-compose.dev.yml    # Development overrides
├── .dockerignore             # Files to ignore in Docker build
├── Makefile                  # Convenient commands
└── DOCKER.md                 # This file
```

## Environment Variables

### Development

- `NODE_ENV=development`
- `CHOKIDAR_USEPOLLING=true` (for file watching on some systems)
- `DEBUG=*` (enable debug output)

### Testing

- `NODE_ENV=test`

### Production

- `NODE_ENV=production`

## Ports

- **3000**: Main development server
- **8080**: Alternative development port
- **8081**: Examples HTTP server
- **9229**: Node.js debugger port
- **5432**: PostgreSQL database (if using)

## Volumes

The Docker setup uses volumes to:
- Mount source code for live editing
- Persist node_modules for faster builds
- Share build outputs with host

## Troubleshooting

### Permission Issues

If you encounter permission issues:

```bash
# Fix ownership (adjust user/group as needed)
sudo chown -R $USER:$USER .

# Or run with current user
docker-compose run --rm --user $(id -u):$(id -g) app npm test
```

### Port Conflicts

If ports are already in use:

```bash
# Check what's using the port
lsof -i :3000

# Or modify docker-compose.yml to use different ports
ports:
  - "3001:3000"  # Map to different host port
```

### Node Modules Issues

If you have issues with node_modules:

```bash
# Clean and rebuild
make docker-clean
make docker-build
```

### File Watching Issues

On some systems, file watching may not work properly. Try:

1. Enabling polling in docker-compose.dev.yml:
   ```yaml
   environment:
     - CHOKIDAR_USEPOLLING=true
   ```

2. Increasing file watch limits:
   ```bash
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

## Production Deployment

For production deployment, use the optimized build:

```dockerfile
# Production Dockerfile example
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## Advanced Configuration

### Custom Docker Compose

You can create your own docker-compose override:

```yaml
# docker-compose.override.yml
version: '3.8'
services:
  app:
    environment:
      - CUSTOM_ENV_VAR=value
    volumes:
      - ./custom-data:/app/data
```

### Multi-stage Builds

For production optimization, consider multi-stage builds:

```dockerfile
# Dockerfile.prod
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## Security Considerations

- The development Docker setup runs as a non-root user (nodejs)
- Sensitive files are excluded via .dockerignore
- Network exposure is limited to necessary ports
- Production builds should use minimal base images

## Performance Tips

- Use `.dockerignore` to exclude unnecessary files
- Use multi-stage builds for production
- Cache node_modules with volumes
- Use specific image tags instead of `latest`
- Consider using Alpine Linux for smaller images