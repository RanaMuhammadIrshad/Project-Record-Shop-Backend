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
    await usersCollection.findByIdAndUpdate(
      order.userId,
      {
        $push: { orders: order._id },
      },
      { new: true }
    );
    // const user = await usersCollection.findById(order.userId);
    // user.orders.push(order._id);
    // await user.save();

    res.json({
      success: true,
      order,
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
    const deletedOrder = await ordersCollection.findByIdAndDelete(id);
    res.json({ success: true, status: deletedOrder });
  } catch (err) {
    next(err);
  }
};
