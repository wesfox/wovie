FROM node:alpine AS wovie-build
WORKDIR /front
COPY . .
RUN npm i
RUN npm run build

# stage 2

FROM nginx:alpine AS wovie-container
COPY --from=wovie-build /front/dist/app /usr/share/nginx/html
EXPOSE 80
