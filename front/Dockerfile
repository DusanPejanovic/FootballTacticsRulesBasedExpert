# Stage 1: Build the Angular application
FROM node:latest as build-step
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app
RUN npm run build -- --output-path=./dist/out --configuration=production

# Stage 2: Serve the app with NGINX
FROM nginx:latest
COPY --from=build-step /app/dist/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
