require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Proxy requests to User Service
app.use('/api/auth', createProxyMiddleware({ target: 'http://localhost:5001', changeOrigin: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));