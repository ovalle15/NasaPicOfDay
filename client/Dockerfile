FROM node:23-bullseye AS client-dev
# TODO: this seems redundant...?
ENV NODE_ENV development
ENV NODE_ENV $NODE_ENV
ENV yarn='corepack yarn'
EXPOSE 8080 9229
WORKDIR /opt/nasa-pod-app/client
COPY ./.yarn ./.yarn
COPY ./src ./src
COPY ./.yarnrc.yml ./.yarnrc.yml
COPY ./package.json ./package.json
COPY ./webpack.config.js ./webpack.config.js
COPY ./yarn.lock ./yarn.lock
RUN $yarn install && $yarn build:dev
ENTRYPOINT $yarn serve
