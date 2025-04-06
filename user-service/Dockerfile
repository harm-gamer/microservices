FROM node:22-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .
EXPOSE 5001
CMD ["node","server.js"]