import * as mongoose from 'mongoose';

export const BookingSchema = new mongoose.Schema({
  booking_id: Number,
  place_name: String,
  place_id: String,
  place_rating: Number,
  place_vicinity: String,
});
