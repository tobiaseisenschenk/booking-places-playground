import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModule } from './bookings/booking.module';
import { environment } from './environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.MONGO_DB_INSTANCE),
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
