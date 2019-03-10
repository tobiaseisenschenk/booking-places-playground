import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './interfaces/booking.interface';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  findAll() {
    return 'This action returns all bookings';
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} booking`;
  }

  @Post()
  async create(@Body() createBooking: Booking) {
    this.bookingService.create(createBooking);
  }
}
