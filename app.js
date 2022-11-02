import express from 'express';
import morgan from 'morgan';
import usersRoute from './routes/usersRoutes.js';
import recordsRoute from './routes/recordsRoutes.js';
import ordersRoute from './routes/ordersRoutes.js';

// Creating or initializing server

const app = express();
const PORT = 4000;

// app.use all methods : get,post,patch.... any URL
app.use(morgan('dev'));

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

// Listening request on port 4000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));
