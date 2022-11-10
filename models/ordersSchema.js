import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Orders document structure
const orderSchema = new Schema({
  // records ids are not a normal string they are ObjectId belongs to records
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: 'records',
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const ordersCollection = mongoose.model('orders', orderSchema);

export default ordersCollection;
