FROM node:lts-alpine

# environment variables
ENV port=9000
ENV github_username=anuraghazra

# setup folder within the docker container with this app's files
WORKDIR /app
COPY ./api               /app/api
COPY ./scripts           /app/scripts
COPY ./src               /app/src
COPY ./themes            /app/themes
COPY ./express.js        /app/express.js
COPY ./package.json      /app/package.json
COPY ./package-lock.json /app/package-lock.json

# prepare script uses a dev-dependency, so remove it,
# move express from dev-dependency to regular dependency
# then finally install all non-dev dependencies
RUN npm pkg delete scripts.prepare \
 && npm pkg set dependencies.express="$(node -p "require('./package.json').devDependencies.express")" \
 && npm pkg delete devDependencies.express \
 && npm ci --omit=dev

# healthcheck
HEALTHCHECK --interval=60m \
    --retries=3 \
    --start-interval=1s \
    --start-period=10s \
    --timeout=5s \
    CMD wget --no-verbose -O - --tries=1 "http://127.0.0.1:$port/api/?username=$github_username" | grep 'GitHub Stats' || exit 1

# start the app, on the supplied port
EXPOSE $port
CMD [ "node", "express.js" ]

