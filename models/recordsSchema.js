import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Record document structure
const recordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

// create collection and store such type of document in that collection
const recordsCollection = mongoose.model('records', recordSchema);

export default recordsCollection;
