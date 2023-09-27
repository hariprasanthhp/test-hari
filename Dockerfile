FROM nginx
COPY nginx_conf/nginx.conf /etc/nginx/
COPY nginx_conf/default.conf /etc/nginx/conf.d/
COPY /dist/calix /usr/share/nginx/html
