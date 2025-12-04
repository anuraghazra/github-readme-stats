# Lightweight production image for self-hosting GitHub Readme Stats
# Build:   docker build -t github-readme-stats .
# Run:     docker run -p 9000:9000 --env-file .env github-readme-stats
# Required envs: PAT_1 (GitHub token), optional: CACHE_SECONDS, WHITELIST, GIST_WHITELIST, EXCLUDE_REPO, FETCH_MULTI_PAGE_STARS

FROM docker.io/node:22-alpine AS base

WORKDIR /app

# Install only prod deps (skip husky/prepare scripts)
COPY package.json package-lock.json ./
ENV HUSKY=0
# Install production deps only, skipping lifecycle scripts (husky)
RUN npm ci --omit=dev --ignore-scripts

# Copy source
COPY . .

ENV NODE_ENV=production \
    PORT=9000

EXPOSE 9000

# Start the Express server defined in express.js
CMD ["node", "express.js"]
