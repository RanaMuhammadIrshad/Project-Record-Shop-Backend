import express from 'express';
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getSingleRecord,
  updateRecord,
} from '../controllers/recordsController.js';
import { isAdmin } from '../middlewares/isAdminMiddleware.js';

const route = express.Router();

// Route GET "/records"
route.get('/', getAllRecords);

// Route GET "/records/:id"
route.get('/:id', getSingleRecord);

// Route POST "/records"
route.post('/', isAdmin, createRecord);

// Route PATCH "/records/:id"
route.patch('/:id', isAdmin, updateRecord);

// Route DELETE "/records/:id"
route.delete('/:id', isAdmin, deleteRecord);

export default route;
