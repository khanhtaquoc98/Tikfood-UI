FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
ADD /dev.conf /etc/nginx/conf.d
