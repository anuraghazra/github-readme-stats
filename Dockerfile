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

RUN npm install -g dotenv-cli

EXPOSE $port

CMD ["dotenv", "--", "node", "express.js"]
