import express from 'express';

const route = express.Router();

// Route GET "/orders"
route.get('/', (req, res) => {
  res.send('Received get request from orders');
});

// Route POST "/orders"
route.post('/', (req, res) => {
  res.send('Received post request from orders');
});

// Route PATCH "/orders/:id"
route.patch('/:id', (req, res, next) => {
  res.send('Received patch request from orders');
});

// Route DELETE "/orders/:id"
route.delete('/:id', (req, res, next) => {
  res.send('Received delete request from orders');
});

export default route;
