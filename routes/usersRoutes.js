import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from '../controllers/usersController.js';

const route = express.Router();

// Route GET "/users"
route.get('/', getAllUsers);

// Route GET "/users/:id"
route.get('/:id', getSingleUser);

// Route POST "/users"
route.post('/', createUser);

// Route PATCH "/users/:id"
route.patch('/:id', updateUser);

// Route DELETE "/users/:id"
route.delete('/:id', deleteUser);

export default route;
