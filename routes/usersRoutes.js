import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  loginUser,
} from '../controllers/usersController.js';
import { body, check } from 'express-validator';
import { usersValidation } from '../middlewares/validationMiddleware.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';

const route = express.Router();

// Route GET "/users"
route.get('/', isAdmin, getAllUsers);

// Route POST "/users/login"
route.post('/login', loginUser);

// Route GET "/users/:id"
route.get('/:id', getSingleUser);

// Route POST "/users"
route.post('/', usersValidation, createUser);

// Route PATCH "/users/:id"
route.patch('/:id', updateUser);

// Route DELETE "/users/:id"
route.delete('/:id', deleteUser);

export default route;
