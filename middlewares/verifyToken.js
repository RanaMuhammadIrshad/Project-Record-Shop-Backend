import jwt from 'jsonwebtoken';
import usersCollection from '../models/usersSchema.js';

async function verifyToken(req, res, next) {
  try {
    // extracting token out fom headers
    const { token } = req.headers;
    // verify token
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY); // decoded or payload
    // console.log(payload);

    // Get user from data base
    const user = await usersCollection.findById(payload._id);
    // Attaching user in request
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export default verifyToken;
