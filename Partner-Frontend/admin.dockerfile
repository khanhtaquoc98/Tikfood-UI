FROM node:13-alpine as build-stage
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build


FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
ADD /frontend.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
