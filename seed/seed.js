import mongoose from 'mongoose';
import recordsCollection from '../models/recordsSchema.js';
import { faker } from '@faker-js/faker';
import usersCollection from '../models/usersSchema.js';

mongoose.connect('mongodb://127.0.0.1:27017/record-shop-rana', () => {
  console.log('SEED connected to DB !!!');
});

// mongodb+srv://rana:28329Bremen@cluster0.q9ba6pk.mongodb.net/test

async function addRecords() {
  const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      const record = new recordsCollection({
        title: faker.commerce.productName(),
        author: faker.name.fullName(),
        year: faker.date.past().getFullYear(),
        img: faker.image.image(),
        price: faker.commerce.price(),
      });
      return record.save();
    });

  await Promise.all(recordPromises);
  mongoose.connection.close();
}

// addRecords();

async function addUsers() {
  const userPromises = Array(20)
    .fill(null)
    .map(() => {
      const user = new usersCollection({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      return user.save();
    });

  await Promise.all(userPromises);
  console.log('20 users are stored in Data base');
  mongoose.connection.close();
}

// addUsers();
