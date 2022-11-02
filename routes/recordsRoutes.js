import express from 'express';

const route = express.Router();

// Route GET "/records"
route.get('/', (req, res) => {
  res.send('Received get request from records');
});

// Route POST "/records"
route.post('/', (req, res) => {
  res.send('Received post request from records');
});

// Route PATCH "/records/:id"
route.patch('/:id', (req, res, next) => {
  res.send('Received patch request from records');
});

// Route DELETE "/records/:id"
route.delete('/:id', (req, res, next) => {
  res.send('Received delete request from records');
});

export default route;
