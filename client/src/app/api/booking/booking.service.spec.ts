import { TestBed } from '@angular/core/testing';

import { BookingService } from './booking.service';
import { IBooking } from './booking.interface';
import { of } from 'rxjs';

describe('BookingService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
  let bookingService: BookingService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    bookingService = new BookingService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(bookingService).toBeTruthy();
  });

  it('should book a place', () => {
    const placeInfo: IBooking = {
      booking_id: 23,
      place_name: 'Gästewohnungen Hubmann',
      place_id: 'ChIJj-hKFBHfnUcRo0hetJrgMZw',
      place_rating: 4.6,
      place_vicinity: 'Fritz-Lange-Straße 6, München'
    };
    httpClientSpy.post.and.returnValue(of(placeInfo));
    const placeInfoPayload = Object.assign(
      {
        booking_id: undefined
      },
      placeInfo
    );
    bookingService.book(placeInfoPayload).subscribe((value: IBooking) => {
      expect(value.booking_id).toBe(23);
    });
  });
});
