# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Instala apenas deps de produção com cache eficiente
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

# Copia o resto do projeto
COPY --chown=node:node . .

USER node
EXPOSE 9000

# Inicia a app
CMD ["node", "express.js"]
