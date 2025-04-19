FROM node:23-alpine

WORKDIR  /app

COPY api-gateway/package*.json   ./

COPY api-gateway/  ./
RUN npm install

EXPOSE 5000

CMD ["node","server.js"]