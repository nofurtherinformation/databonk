# Databonk.js Development Makefile

.PHONY: help build dev test clean install lint typecheck docker-build docker-dev docker-test docker-clean

# Colors for output
BLUE=\033[0;34m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

# Default target
help: ## Show this help message
	@echo "$(BLUE)Databonk.js Development Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

# Local development commands
install: ## Install dependencies
	npm install

build: ## Build the project
	npm run build

dev: ## Start development mode
	npm run dev

test: ## Run tests
	npm test

test-watch: ## Run tests in watch mode
	npm run test:watch

lint: ## Run linter
	npm run lint

typecheck: ## Run TypeScript type checking
	npm run typecheck

clean: ## Clean build artifacts
	rm -rf dist/ node_modules/ coverage/

# Docker commands
docker-build: ## Build Docker image
	@echo "$(YELLOW)Building Docker image...$(NC)"
	docker-compose build

docker-dev: ## Start development environment in Docker
	@echo "$(YELLOW)Starting development environment...$(NC)"
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

docker-test: ## Run tests in Docker
	@echo "$(YELLOW)Running tests in Docker...$(NC)"
	docker-compose run --rm test

docker-lint: ## Run linter in Docker
	@echo "$(YELLOW)Running linter in Docker...$(NC)"
	docker-compose run --rm lint

docker-typecheck: ## Run TypeScript checking in Docker
	@echo "$(YELLOW)Running TypeScript checking in Docker...$(NC)"
	docker-compose run --rm typecheck

docker-build-prod: ## Build production image
	@echo "$(YELLOW)Building for production...$(NC)"
	docker-compose run --rm build

docker-shell: ## Open shell in Docker container
	@echo "$(YELLOW)Opening shell in container...$(NC)"
	docker-compose run --rm app sh

docker-clean: ## Clean Docker containers and images
	@echo "$(YELLOW)Cleaning Docker containers and images...$(NC)"
	docker-compose down --volumes --remove-orphans
	docker system prune -f

docker-reset: docker-clean docker-build ## Reset Docker environment
	@echo "$(GREEN)Docker environment reset complete$(NC)"

# Development workflow
setup: install build ## Initial setup for development
	@echo "$(GREEN)Setup complete! Run 'make dev' to start development$(NC)"

ci: lint typecheck test build ## Run CI pipeline locally
	@echo "$(GREEN)CI pipeline completed successfully$(NC)"

# Example commands
example: ## Run basic example
	node -r ts-node/register examples/basic.ts

example-docker: ## Run basic example in Docker
	docker-compose run --rm app node -r ts-node/register examples/basic.ts