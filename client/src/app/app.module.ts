import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlacesService } from './api/places/places.service';
import { BookingService } from './api/booking/booking.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [PlacesService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
