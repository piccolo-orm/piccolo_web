FROM node:9-alpine

RUN npm install -g http-server
RUN mkdir /app
ADD app/package.json /app/package.json
WORKDIR /app
RUN npm install

ADD app/src /app/src
ADD app/tsconfig.json /app/tsconfig.json
ADD app/public /app/public
ADD app/.env.production /app/.env.production
ADD app/vue.config.js /app/vue.config.js

ENV NODE_ENV=production
RUN npm run build

EXPOSE 80

CMD ["/usr/local/bin/http-server", "/app/dist", "-p", "80"]
