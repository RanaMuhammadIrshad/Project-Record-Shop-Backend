import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import usersRoute from './routes/usersRoutes.js';
import recordsRoute from './routes/recordsRoutes.js';
import ordersRoute from './routes/ordersRoutes.js';
// import cors from 'cors';

dotenv.config(); // dotenv take env variables and store in process.env object

// Creating or initializing server
const app = express();
// const PORT = 4000;

// dynamic porting
const PORT = process.env.PORT || 4000;

// Configure multer package
// const upload = multer({ dest: 'upload/'});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fullPath = './upload';
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    let fileName = Date.now() + '_' + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// create mongoose connection:
mongoose.connect(process.env.MONGO_URI, () => {
  console.log('DB connection is established!!!');
});

// Cors middleware
// app.use(cors({ origin: 'http://localhost:3000', exposedHeaders: ['token'] })); // '*' to allow all

// app.use all methods : get,post,patch.... any URL
app.use(morgan('dev'));

//express json middleware to parse any incoming date to json data
app.use(express.json());

// server static files/pages
app.use(express.static('upload'));

// Serving our REACT-APP build file
app.use(express.static('views/build'));
app.get('/', (req, res) => {
  res.sendFile('./views/build/index.html', { root: '.' });
});

// MVC
// Models (data storage)
// Views (UI, frontend, presentational data)
// Controllers (request, handlers, logic)

// Routes
// "/users" GET POST PATCh DELETE  // upload.single ill attach req.file
app.use('/users', upload.single('image'), usersRoute);
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
  res.status(err.status || 500).json({ success: false, message: err.message });
});

// Listening request on port 4000
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}...`));
