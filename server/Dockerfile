#  Dockerfile for Node Express Backend

FROM node:23-bullseye AS server-dev
# TODO: this seems redundant...?
ENV NODE_ENV development
ENV NODE_ENV $NODE_ENV
ENV yarn='corepack yarn'

WORKDIR /opt/nasa-pod-app/server

# Install Dependencies
COPY .yarn ./
COPY package*.json ./
COPY yarn.lock ./

RUN $yarn install

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

ENTRYPOINT $yarn start
