FROM node:23-alpine

WORKDIR /app

COPY frontend/package*.json ./


COPY frontend/  ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run" ,"dev"]


