const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./database');
app.use(express.json());


app.get('/api', (req, res) => {
  res.send({ message: 'Hello from server!' });
});


app.listen(process.env.port, async() => {
  await connectDB();
  console.log('Server listening on port: ', process.env.port);
});