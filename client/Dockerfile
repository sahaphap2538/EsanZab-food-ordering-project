




# # syntax=docker/dockerfile:1
# FROM node:12-alpine
# RUN apk add --no-cache python2 g++ make
# WORKDIR /app
# COPY . .
# RUN yarn install --production
# CMD ["node", "src/index.js"]
# EXPOSE 3000



# Dockerfile for React client

# Build react client
FROM node:16.14.0

ENV NODE_ENV=production

# Working directory be app
WORKDIR /app

COPY . /app

###  Installing dependencies

RUN npm install --production

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]