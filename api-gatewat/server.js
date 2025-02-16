require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const authMiddleware = require('./Middleware/authmiddleware');

const app = express();
app.use(cors());
app.use(express.json()); // Increase body limit


// const serviceProxy = Object.assign({}, { target: "http://localhost:5001/", changeOrigin: true });
// Proxy requests to User Service
app.use('/api/auth', createProxyMiddleware({
    target: 'http://localhost:5001', // Make sure this is correct
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' }   
}));
// app.use('/api/auth', createProxyMiddleware(serviceProxy));
// app.use('/api/products',authMiddleware, createProxyMiddleware({ target: 'http://localhost:5002', changeOrigin: true }));
// app.use('/api/orders', authMiddleware, createProxyMiddleware({ target: 'http://localhost:5003', changeOrigin: true }));
// app.use('/api/payments', authMiddleware, createProxyMiddleware({ target: 'http://localhost:5004', changeOrigin: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));