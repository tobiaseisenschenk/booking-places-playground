import { Component, NgZone } from '@angular/core';
import { PlacesService } from './api/places/places.service';
import {
  MatBottomSheet,
  MatBottomSheetConfig
} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './utils/bottom-sheet/bottom-sheet.component';
import { BookingService } from './api/booking/booking.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IBooking } from './api/booking/booking.interface';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

declare let google;

interface IMarker {
  map: any;
  icon: string;
  title: string;
  position: any;
  clickable: boolean;
  animation: any;
  place_id: string;
  place_vicinity: string;
  place_rating: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking-places';

  constructor(
    private placesService: PlacesService,
    private zone: NgZone,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private bookingService: BookingService
  ) {
    this.placesService.injectPlaces().subscribe(() => {
      this.placesService.getMyPlaces().subscribe((places: Array<any>) => {
        if (places.length > 0) {
          this.createMarkers(places);
        }
      });
    });
  }

  private createMarkers(places) {
    const gmap = new google.maps.Map(document.getElementById('map'));
    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i <= places.length - 1; i++) {
      const place = places[i];
      const image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      const marker: IMarker = new google.maps.Marker({
        map: gmap,
        icon: image,
        title: place.name,
        position: place.geometry.location,
        clickable: true,
        animation: google.maps.Animation.DROP,
        place_id: place.place_id,
        place_vicinity: place.vicinity,
        place_rating: place.rating
      });
      google.maps.event.addListener(marker, 'click', () => {
        this.zone.run(() => {
          this.bookPlace(marker);
        });
      });
      bounds.extend(place.geometry.location);
    }
    gmap.fitBounds(bounds);
  }

  private bookPlace(placeInfo: IMarker) {
    const config = new MatBottomSheetConfig();
    config.data = { name: placeInfo.title };
    const ref = this.bottomSheet.open(BottomSheetComponent, config);
    ref
      .afterDismissed()
      .pipe(filter(accepted => accepted))
      .subscribe(booked => {
        const bookingDto: IBooking = {
          place_name: placeInfo.title,
          place_id: placeInfo.place_id,
          place_rating: placeInfo.place_rating,
          place_vicinity: placeInfo.place_vicinity
        };
        this.bookingService.book(bookingDto).subscribe(
          (success: IBooking) => {
            this.snackBar.open('We saved your booking!', undefined, {
              duration: 3000
            });
          },
          (error: HttpErrorResponse) => {
            console.error(
              '[AppComponent] could not save booking due to: ',
              error
            );
          }
        );
      });
  }
}
