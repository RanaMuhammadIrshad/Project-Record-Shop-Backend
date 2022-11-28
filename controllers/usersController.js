import usersCollection from '../models/usersSchema.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersCollection.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleUser = await usersCollection.findById(id);

    res.json({ success: true, user: singleUser });
  } catch (err) {
    // err.status = 404;
    const error = new Error('Id does not exists!');
    error.status = 404;
    next(error);
  }
};

// Register / Signup User
export const createUser = async (req, res, next) => {
  console.log(req.file);
  try {
    // Before storing password we need to hash it here

    // Hashing password using bcrypt
    // bcrypt.hash async // bcrypt.hashSync
    // bcrypt.compare asyn // bcrypt.compareSync sync

    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(hashedPassword);
    // req.body.password = hashedPassword;
    const user = new usersCollection(req.body);

    if (req.file) {
      user.profileImage = `http://localhost:4000/${req.file.filename}`;
    }

    await user.save();
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = await usersCollection.findById(id);
    if (req.file) {
      user.profileImage = `http://localhost:4000/${req.file.filename}`;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();

    let body = {};
    for (const key in req.body) {
      if (req.body[key] !== '' && key !== 'password') {
        body[key] = req.body[key];
      }
    }

    // user = { ...user, ...req.body }; // will overwrite values coming from req.body

    // const updatedUser = await usersCollection.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });
    const updatedUser = await usersCollection
      .findByIdAndUpdate(id, body, {
        new: true,
      })
      .populate('orders');
    res.json({ success: true, data: updatedUser });
    // res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await usersCollection.findByIdAndDelete(id);

    res.json({ success: true, status: deletedUser });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await usersCollection.findOne({ email: req.body.email });
    // .findOne({ email: req.body.email.toLowerCase() })
    // .select('-_id -firstName -lastName -__v');
    if (user) {
      const check = await bcrypt.compare(req.body.password, user.password);
      if (check) {
        // Authentication // creation of token
        // first argument in sign is payload (user's data)
        // second argument is your signature
        let token = jwt.sign(
          { _id: user._id, firstName: user.firstName },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: '1h', issuer: 'rana', audience: 'students' }
        );
        const updatedUser = await usersCollection
          .findByIdAndUpdate(
            user._id,
            {
              token: token,
            },
            { new: true }
          )
          .select('-token')
          .populate('orders');
        // user.token = token;
        // await user.save();
        // res.json({ success: true, data: user, token });
        // res.cookie('authenticationCertificate', token);
        // res.header('authenticationCertificate', token);
        // res.json({ success: true, data: user });
        res.header('token', token).json({ success: true, data: updatedUser });
      } else {
        throw new Error('password does not match!');
      }
    } else {
      throw new Error('email does not exists!');
    }
  } catch (err) {
    next(err);
  }
};

export const checkUserToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = await usersCollection.findById(payload._id).populate('orders');
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
