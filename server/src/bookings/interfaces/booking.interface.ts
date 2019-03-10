import { Document } from 'mongoose';

export interface Booking extends Document {
  readonly id: number;
  readonly name: string;
  readonly age: number;
}
