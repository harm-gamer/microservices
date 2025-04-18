require('dotenv').config();
const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const expressProxy = require("express-http-proxy");
const cors = require('cors');


const app = express();
app.use(cors({
    origin: "*", 
    credentials: true,
})); 
// Allow requests from the API Gateway
app.use(express.json({limit : '50mb'})); // Increase body limit
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use("/api/auth",expressProxy("http://user-service:5001"));
app.use("/api/products",expressProxy("http://product-service:5002"));
app.use("/api/user",expressProxy("http://user-service:5001"))
app.use("/product/cart",expressProxy("http://product-service:5002"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));