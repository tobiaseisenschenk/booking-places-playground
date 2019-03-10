import { Component } from '@angular/core';
import { PlacesService } from './api/places/places.service';

declare let google;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking-places';

  constructor(private placesService: PlacesService) {
    this.placesService.injectPlaces().subscribe(() => {
      this.placesService.getMyPlaces().subscribe((places: Array<any>) => {
        if (places.length > 0) {
          console.log('my places', places);
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
      const marker = new google.maps.Marker({
        map: gmap,
        icon: image,
        title: place.name,
        position: place.geometry.location,
        clickable: true,
        animation: google.maps.Animation.DROP
      });
      google.maps.event.addListener(marker, 'click', () =>
        console.log('clicked on ', marker)
      );
      bounds.extend(place.geometry.location);
    }
    gmap.fitBounds(bounds);
  }

  private bookPlace() {
    // TODO: implement
  }
}
