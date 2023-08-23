##

FROM node:18-alpine AS wovie-front-build
WORKDIR /app
COPY front/package.json front/package-lock.json* ./
RUN npm i
COPY front .
RUN node_modules/.bin/ng build --configuration production

FROM nginx:latest
RUN mkdir /app
COPY --from=wovie-front-build /app/dist/app/ /app
COPY nginx.conf /etc/nginx/nginx.conf
USER nginx

