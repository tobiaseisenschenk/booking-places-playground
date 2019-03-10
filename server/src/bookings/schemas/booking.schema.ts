import * as mongoose from 'mongoose';

export const BookingSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
});
