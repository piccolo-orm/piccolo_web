FROM node:10-alpine

RUN apk add --no-cache nginx
RUN mkdir /run/nginx

# Forward request and error logs to docker log collector
# From official Nginx docker container
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir /app
ADD app/package.json /app/package.json
WORKDIR /app
RUN npm install

ADD app/src /app/src
ADD app/public /app/public
ADD app/content /app/content

ADD app/babel.config.js /app/
ADD app/gulpfile.js /app/

RUN npm run gulp

ENV NODE_ENV=production
RUN npm run build

EXPOSE 80

STOPSIGNAL SIGTERM

RUN rm /etc/nginx/conf.d/default.conf
ADD nginx/piccolo.conf /etc/nginx/conf.d/

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
