import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRoute from './routes/usersRoutes.js';
import recordsRoute from './routes/recordsRoutes.js';
import ordersRoute from './routes/ordersRoutes.js';

dotenv.config(); // dotenv take env variables and store in process.env object

// Creating or initializing server
const app = express();
const PORT = 4000;

// create mongoose connection:
mongoose.connect(process.env.MONGO_URI, () => {
  console.log('DB connection is established!!!');
});

// app.use all methods : get,post,patch.... any URL
app.use(morgan('dev'));

//express json middleware to parse any incoming date to json data
app.use(express.json());

// MVC
// Models (data storage)
// Views (UI, frontend, presentational data)
// Controllers (request, handlers, logic)

// Routes
// "/users" GET POST PATCh DELETE
app.use('/users', usersRoute);
// "/records" GET POST PATCh DELETE
app.use('/records', recordsRoute);
// "/orders" GET POST PATCH DELETE
app.use('/orders', ordersRoute);
// Handling 404 page not found error (error handling middle ware)
app.use('*', (req, res, next) => {
  // res.json({ success: false, message: 'There is no such route found!' });
  res.sendFile('./views/pageNotFound.html', { root: '.' });
});

// Universal error handler middleware
// Request along with an error enters into this middleware
app.use((err, req, res, next) => {
  res.json({ success: false, message: err.message });
});

// Listening request on port 4000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));
