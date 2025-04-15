FROM node:23-alpine

WORKDIR /app

COPY package* .

RUN npm install
COPY . .


EXPOSE 5002

CMD ["node","server.js"]
