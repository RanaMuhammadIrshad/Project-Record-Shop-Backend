import express from 'express';
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getSingleRecord,
  updateRecord,
} from '../controllers/recordsController.js';

const route = express.Router();

// Route GET "/records"
route.get('/', getAllRecords);

// Route GET "/records/:id"
route.get('/:id', getSingleRecord);

// Route POST "/records"
route.post('/', createRecord);

// Route PATCH "/records/:id"
route.patch('/:id', updateRecord);

// Route DELETE "/records/:id"
route.delete('/:id', deleteRecord);

export default route;
