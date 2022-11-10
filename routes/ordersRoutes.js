import express from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from '../controllers/ordersController.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';

const route = express.Router();

// Route GET "/orders"
route.get('/', isAdmin, getAllOrders);

// Route GET "/orders/:id"
route.get('/:id', getSingleOrder);

// Route POST "/orders"
route.post('/', createOrder);

// Route PATCH "/orders/:id"
route.patch('/:id', updateOrder);

// Route DELETE "/orders/:id"
route.delete('/:id', deleteOrder);

export default route;
