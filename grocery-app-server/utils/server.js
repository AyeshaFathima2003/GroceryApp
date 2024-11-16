const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const port = process.env.BACKEND_PORT || 6000;

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend')));

// API routes
app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
