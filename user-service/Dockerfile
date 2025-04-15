FROM node:23-alpine

WORKDIR /app

COPY user-service/package*.json  ./

COPY user-service/ ./
RUN npm install

EXPOSE 5001
CMD ["node","server.js"]