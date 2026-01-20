# Use Node.js LTS (Long Term Support) version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    git \
    bash \
    curl

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci

# Copy source code
COPY . .

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port for development server
EXPOSE 3000 8080

# Default command for development
CMD ["npm", "run", "dev"]