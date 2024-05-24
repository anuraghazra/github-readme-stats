FROM node:lts-alpine

# setup folder within the docker container with this app's files
WORKDIR /app
COPY . .

# add express.js as dependency and download node modules
RUN npm install express.js

# start the app, on the supplied port
EXPOSE $port
CMD [ "node", "express.js" ]

