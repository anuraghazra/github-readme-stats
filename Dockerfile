FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i --omit=dev --ignore-scripts --no-audit
RUN npm i express

COPY api ./api
COPY src ./src
COPY themes ./themes
COPY vercel.json ./
COPY express.js ./

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN mkdir -p /app/cache && chmod 777 /app/cache

RUN npm install -g dotenv-cli
RUN apk --no-cache add curl

ARG PORT=9000
ENV PORT=${PORT}

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f "http://localhost:${PORT:-9000}/api" || exit 1

EXPOSE ${PORT}

CMD ["dotenv", "--", "node", "express.js"]
