require('dotenv').config();
const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const {createProxyMiddleware} = require("express-http-proxy");
const cors = require('cors');
const authMiddleware = require('./Middleware/authmiddleware');

const app = express();
app.use(cors({
    origin: "*", 
    credentials: true,
})); // Allow requests from the API Gateway
app.use(express.json({limit : '50mb'})); // Increase body limit
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// const serviceProxy = Object.assign({}, { target: "http://localhost:5001/", changeOrigin: true });
// Proxy requests to User Service
app.use('/api/auth', createProxyMiddleware({
    target: 'http://localhost:5001', // Make sure this is correct
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${proxyReq.path}`);
    },
    onError: (err, req, res) => {
        console.error("Proxy Error:", err);
        res.status(500).send("Proxy error");
    }
    
}));
// app.use('/api/auth', createProxyMiddleware(serviceProxy));
// app.use('/api/products',authMiddleware, createProxyMiddleware({ target: 'http://localhost:5002', changeOrigin: true }));
// app.use('/api/orders', authMiddleware, createProxyMiddleware({ target: 'http://localhost:5003', changeOrigin: true }));
// app.use('/api/payments', authMiddleware, createProxyMiddleware({ target: 'http://localhost:5004', changeOrigin: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));