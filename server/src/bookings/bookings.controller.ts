import { Controller, Get, Post, Param } from '@nestjs/common';

@Controller('bookings')
export class BookingsController {
  @Get()
  findAll() {
    return 'This action returns all bookings';
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return `This action returns a #${id} booking`;
  }

  @Post()
  create() {
    return 'This action adds a new booking';
  }
}
