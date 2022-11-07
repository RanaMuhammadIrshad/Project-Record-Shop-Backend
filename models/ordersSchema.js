import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Orders document structure
const orderSchema = new Schema({
  records: [
    {
      type: String,
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

const ordersCollection = mongoose.model('orders', orderSchema);

export default ordersCollection;
