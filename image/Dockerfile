FROM node:9-alpine

RUN npm install -g http-server
RUN mkdir /app
ADD app/package.json /app/package.json
WORKDIR /app
RUN npm install

ADD app/src /app/src
ADD app/public /app/public

ADD app/md /app/md

ADD app/babel.config.js /app/
ADD app/gulpfile.js /app/

RUN npm run gulp

ENV NODE_ENV=production
RUN npm run build

EXPOSE 80

CMD ["/usr/local/bin/http-server", "/app/dist", "-p", "80"]
