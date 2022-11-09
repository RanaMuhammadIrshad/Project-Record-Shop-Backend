import usersCollection from './../models/usersSchema.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

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
  try {
    // Before storing password we need to hash it here

    // Hashing password using bcrypt
    // bcrypt.hash async // bcrypt.hashSync
    // bcrypt.compare asyn // bcrypt.compareSync sync

    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(hashedPassword);
    // req.body.password = hashedPassword;
    const user = new usersCollection(req.body);
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
    const updatedUser = await usersCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, user: updatedUser });
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
        res.json({ success: true, data: user });
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
