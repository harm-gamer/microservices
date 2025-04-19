## manula installation 
  - clone the repository
  - cd into api-gateway && npm install
  - cd into  user-service && npm install
  - cd into product-service && npm install
  - put your mongo instance && your secrets in .env file
  -  move in each one of service 
  - node server.js


## Docker installation 
  - install docker
  - move to api-gateway
  - create network - `docoker network create microservicenet`
  - docker build for api-gateway - `docker build  -t api-gateway .`
  - docker run for api-gateway -  `docker run --name api-gateway --network microservicenet -p 5000:5000  api-gateway`
  - docker build for user-service - `docker build -t user-service .`
  - docker run for user-service  -  `docker run  --network microservicenet -e MONGO_URI="your instance" --dns 8.8.8.8 -p 5001:5001  user-service`
  - docker build for product-service - `docker build -t product-service .`
  - docker run for product-service  -  `docker run  --network microservicenet -e MONGO_URI="your instance" --dns 8.8.8.8 -p 5002:5002 product-service`
   docker build for frontend  - `docker build -t frontend .`
  - docker run for user-service  -  `docker run  --network microservicenet -e MONGO_URI="your instance" --dns 8.8.8.8 -p 5173:5173 frontend`  

  ## Docker-compose installation
     - docker-compose up 
