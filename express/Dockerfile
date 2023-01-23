FROM node:18-alpine

# Copy express/index.js, src, themes, vercel.json, package.json, and package-lock.json
COPY api /app/api
COPY express/*.js /app/express/
COPY src /app/
COPY themes /app/
COPY vercel.json /app/
COPY package.json /app/
COPY package-lock.json /app/

# Create app directory
WORKDIR /app

# Install app dependencies
RUN npm ci --omit dev --ignore-scripts --no-audit

# Run the app
CMD [ "node", "express/index.js" ]
