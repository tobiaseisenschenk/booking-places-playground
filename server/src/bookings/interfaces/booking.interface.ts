import { Document } from 'mongoose';

export interface Booking extends Document {
  readonly booking_id: number;
  readonly place_name: string;
  readonly place_id: string;
  readonly place_rating: number;
  readonly place_vicinity: string;
}
