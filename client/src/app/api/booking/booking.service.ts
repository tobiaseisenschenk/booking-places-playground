import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBooking } from './booking.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) {}

  book(placeInfo: IBooking): Observable<IBooking> {
    return this.http
      .post(`${environment.API_URL}bookings/`, placeInfo)
      .pipe(map(obj => obj as IBooking));
  }
}
