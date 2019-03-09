import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private GOOGLE_PLACES_API =
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  constructor(private http: HttpClient) {}

  getLatLong(): Observable<any> {
    return this.http.get(`${this.GOOGLE_PLACES_API}?`);
  }
}
