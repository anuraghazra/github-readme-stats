FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i --omit=dev --ignore-scripts --no-audit
RUN npm i express
RUN apk --no-cache add curl

COPY api ./api
COPY src ./src
COPY themes ./themes
COPY vercel.json ./
COPY express.js ./

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm install -g dotenv-cli

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:$port/api || exit 1

EXPOSE $port

CMD ["dotenv", "--", "node", "express.js"]
