import express from 'express';

const route = express.Router();

// Route GET "/users"
route.get('/', (req, res) => {
  res.send('Received get request from user');
});

// Route POST "/users"
route.post('/', (req, res) => {
  res.send('Received post request from user');
});

// Route PATCH "/users/:id"
route.patch('/:id', (req, res, next) => {
  res.send('Received patch request from user');
});

// Route DELETE "/users/:id"
route.delete('/:id', (req, res, next) => {
  res.send('Received delete request from user');
});

export default route;
