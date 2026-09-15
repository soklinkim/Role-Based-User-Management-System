require('dotenv').config();
const express = require('express');
const connectDB = require('./dbconnect');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'registration-service', status: 'ok' });
});

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Registration service running on port ${PORT}`));
});