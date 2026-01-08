FROM node:current-bookworm-slim

WORKDIR /app

COPY api /app/api
COPY src /app/src
COPY themes /app/themes
COPY package-docker.json /app/package.json
COPY express.js /app/express.js
RUN cd /app
RUN npm i

CMD ["node", "express.js"]