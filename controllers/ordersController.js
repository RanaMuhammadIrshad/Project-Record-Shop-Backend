import usersCollection from '../models/usersSchema.js';
import ordersCollection from './../models/ordersSchema.js';

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await ordersCollection
      .find()
      .populate('records', '-_id -title -year -__v')
      .populate('userId', '-_id -password -firstName -domain -email -__v');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleOrder = await ordersCollection.findById(id);

    res.json({ success: true, order: singleOrder });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = new ordersCollection(req.body);
    await order.save();
    const updatedUser = await usersCollection
      .findByIdAndUpdate(
        order.userId,
        {
          $push: { orders: order._id },
        },
        { new: true }
      )
      .populate('orders');
    // const user = await usersCollection.findById(order.userId);
    // user.orders.push(order._id);
    // await user.save();

    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedOrder = await ordersCollection.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json({ success: true, order: updatedOrder });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    // delete order from orders collection
    await ordersCollection.findByIdAndDelete(id);
    // delete order from user orders as well
    const updatedUser = await usersCollection
      .findByIdAndUpdate(req.user._id, { $pull: { orders: id } }, { new: true })
      .populate('orders');
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};
