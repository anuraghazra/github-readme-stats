FROM node:22-alpine3.20 As development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

ENV NODE_ENV production

EXPOSE 9000

CMD [ "node", ".express.js"]