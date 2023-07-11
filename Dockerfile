FROM node:lts-alpine as build-stage
WORKDIR /app
ENV WEB_PORT=3000
ENV BACKEND_HOST=estacionamento-backend
ENV DB_PORT=8080
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]