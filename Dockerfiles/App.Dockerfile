FROM node:10.15.3-alpine

RUN mkdir -p node/hello-node

ENV DIR node/hello-node
ENV APP_PORT 3001

WORKDIR ${DIR}

ADD ./ node/hello-node

RUN npm install -g concurrently typescript

EXPOSE ${APP_PORT}

CMD npm run build-development
