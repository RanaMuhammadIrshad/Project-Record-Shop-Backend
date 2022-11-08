import usersCollection from './../models/usersSchema.js';
import { validationResult } from 'express-validator';

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
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
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
