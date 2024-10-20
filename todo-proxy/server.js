// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy requests to /api to the backend
app.use('/api', createProxyMiddleware({
    target: 'https://todo-backend-8tzg.onrender.com', // your backend URL
    changeOrigin: true,
}));

// Serve the frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
