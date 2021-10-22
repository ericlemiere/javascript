const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
})

server.get('/about', (req, res) => {
  res.send('Hello World ABOUT');
})

server.listen(4242, () => {
  console.log('Express Server is running...');
});
