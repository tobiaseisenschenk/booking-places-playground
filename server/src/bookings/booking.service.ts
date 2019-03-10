import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './interfaces/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
  ) {}

  async create(createBookingDto: Booking): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return await createdBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingModel.find().exec();
  }
}
