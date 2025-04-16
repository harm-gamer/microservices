FROM node:23-alpine

WORKDIR /app

COPY product-service/package*.json  ./

RUN npm install

COPY product-service/  ./


EXPOSE 5002

CMD ["node","server.js"]
