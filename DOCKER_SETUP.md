# Docker Setup Documentation

## Issue: Infinite Restart Loop

This document explains the Docker configuration issues that caused infinite restart loops and how they were resolved.

## Problems Identified

### 1. Import Path Issue
**Location:** `src/common/color.js:3`

**Problem:** The import path was pointing to `../../themes/index.js` (root level) but themes directory was moved to `src/themes/`

**Solution:**
```javascript
// Before
import { themes } from "../../themes/index.js";

// After
import { themes } from "../themes/index.js";
```

### 2. Missing Dependencies
**Location:** `src/package.json`

**Problem:** The src/package.json only had devDependencies, missing all runtime dependencies needed by the application.

**Solution:** Added production dependencies:
```json
"dependencies": {
  "axios": "^1.13.1",
  "dotenv": "^17.2.3",
  "emoji-name-map": "^2.0.3",
  "github-username-regex": "^1.0.0",
  "word-wrap": "^1.2.5"
}
```

### 3. Wrong Docker Build Context
**Location:** `docker-compose.yml`

**Problem:** Build context was set to `./src` but the actual server file (`express.js`) and `api/` directory are at the root level.

**Solution:**
```yaml
# Before
build:
  context: ./src
  dockerfile: Dockerfile

# After
build:
  context: .
  dockerfile: Dockerfile
```

### 4. Wrong Entry Point
**Location:** `Dockerfile` CMD instruction

**Problem:** Container was trying to run `src/index.js` which only exports modules, not the actual Express server.

**Solution:**
```dockerfile
# Before
CMD ["node", "index.js"]

# After
CMD ["node", "express.js"]
```

### 5. Node Version Mismatch
**Location:** `Dockerfile`

**Problem:** Dockerfile used Node 18, but `package.json` requires Node >=22

**Solution:**
```dockerfile
# Before
FROM node:18-alpine AS base

# After
FROM node:22-alpine AS base
```

### 6. Husky Prepare Script
**Location:** `Dockerfile` npm install step

**Problem:** The `prepare` script tries to run `husky` (git hooks) during Docker build, which fails and isn't needed in containers.

**Solution:**
```dockerfile
npm ci --omit=dev --ignore-scripts
```

## Final Working Configuration

### Dockerfile Structure
```dockerfile
FROM node:22-alpine AS base

# Dependencies stage - installs only production dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN npm ci --omit=dev --ignore-scripts

# Builder stage - prepares application files
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Runner stage - production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/api ./api
COPY --from=builder /app/themes ./themes
COPY --from=builder /app/express.js ./express.js

EXPOSE 3000
CMD ["node", "express.js"]
```

## Testing the Setup

### Start the container
```bash
docker compose up -d
```

### Check container status
```bash
docker ps --filter "name=github-readme-stats"
```

### View logs
```bash
docker logs github-readme-stats
```

Expected output:
```
[dotenv@17.2.3] injecting env (0) from .env
Server running on port 3000
```

### Test the API
```bash
curl "http://localhost:3000/api/?username=YOUR_GITHUB_USERNAME"
```

## Deployment Notes

Before deploying to VPS:

1. **Environment Variables:** Create a `.env` file with your GitHub token:
   ```
   PAT_1=your_github_personal_access_token
   ```

2. **Port Configuration:** Update `docker-compose.yml` if you need a different port:
   ```yaml
   ports:
     - "8080:3000"  # Maps host port 8080 to container port 3000
   ```

3. **Domain Configuration:** Update Traefik labels in `docker-compose.yml`:
   ```yaml
   - "traefik.http.routers.github-readme-stats.rule=Host(`your-domain.com`)"
   ```

4. **SSL/TLS:** Ensure your Traefik setup has a valid cert resolver configured

## Troubleshooting

### Container keeps restarting
```bash
# Check logs immediately
docker logs github-readme-stats --tail 50

# Common issues:
# - Missing dependencies: Check package.json
# - Module not found: Check import paths
# - Port conflicts: Check if port 3000 is available
```

### Port already in use
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
Stop-Process -Id <PID> -Force

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

## File Structure
```
github-readme-stats/
├── api/                    # API endpoints
├── src/                    # Source code
│   ├── common/            # Common utilities
│   ├── cards/             # Card generators
│   ├── fetchers/          # Data fetchers
│   └── themes/            # Theme definitions
├── themes/                 # Root themes (legacy)
├── express.js             # Express server (entry point)
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose setup
└── package.json           # Dependencies
```
