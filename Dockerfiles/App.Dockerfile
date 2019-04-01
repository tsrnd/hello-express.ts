FROM node:10.15.3-alpine

RUN mkdir -p node/hello-node-ts

ENV DIR node/hello-node-ts
ENV APP_PORT 8081

WORKDIR ${DIR}

ADD ./ node/hello-node-ts

RUN npm install -g concurrently typescript

EXPOSE ${APP_PORT}

CMD npm run dev