#  Dockerfile for Node Express Backend

FROM node:16.14.0

# Create App Directory
RUN mkdir -p /app
WORKDIR /app

# Install Dependencies
COPY  . /app

RUN npm install --production

# Copy app source code
COPY . .

# Exports
EXPOSE 8000

CMD ["npm","start"]