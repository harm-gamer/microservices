FROM node:23-alpine

WORKDIR  /app

COPY api-gatewat/package*.json   ./

COPY api-gatewat/  ./
RUN npm install

EXPOSE 5000

CMD ["node","server.js"]