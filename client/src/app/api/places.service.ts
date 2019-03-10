import { Injectable } from '@angular/core';
import { Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter, map, switchMap, tap } from 'rxjs/operators';
/// <reference path="../../../node_modules/@types/googlemaps/index.d.ts"/>

declare let google;
let gmap;

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private GOOGLE_GEOLOCATION_API = `https://www.googleapis.com/geolocation/v1/geolocate?key=${
    environment.GOOGLE_PLACES_API_KEY
  }`;

  constructor(private http: HttpClient) {}

  getMyPlaces(): Observable<Array<any>> {
    return this.getLatLng().pipe(
      switchMap(location => this.getPlaces(location.lat, location.lng))
    );
  }

  getPlaces(latitue: number, longitude: number): Observable<any> {
    if (!google) {
      return;
    }
    const loc = new google.maps.LatLng(48.1099776, 11.570380799999999);
    gmap = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 15
    });

    const request = {
      location: loc,
      radius: '500',
      type: ['lodging']
    };
    const gpservice = new google.maps.places.PlacesService(gmap);
    const nearbySearchCallback = gpservice.nearbySearch.bind(gpservice);

    return Observable.create(observer => {
      nearbySearchCallback(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          observer.next(results);
          observer.complete();
        } else {
          observer.console.error();
        }
      });
    });
  }

  getLatLng(): Observable<any> {
    return this.http
      .post(this.GOOGLE_GEOLOCATION_API, { considerIp: true })
      .pipe(
        filter(exists => !!exists),
        map((response: any) => response.location)
      );
  }

  injectPlaces() {
    const doc = document;
    const tagName = 'script';
    const id = 'google-places';
    const source = `https://maps.googleapis.com/maps/api/js?key=${
      environment.GOOGLE_PLACES_API_KEY
    }&libraries=geometry,places&callback=gmapsReady`;
    if (doc.getElementById(id)) {
      return;
    }
    const referenceNode: HTMLScriptElement = doc.getElementsByTagName(
      tagName
    )[0] as HTMLScriptElement;
    let newNode = referenceNode;
    newNode = doc.createElement('script') as HTMLScriptElement;
    newNode.id = id;
    newNode.src = source;
    newNode.async = true;
    newNode.defer = true;
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
    const myWindow = window as any;
    myWindow.gmapsReady = () => {
      const gmapsReadyEvent = new Event('gmapsReadyEvent');
      myWindow.dispatchEvent(gmapsReadyEvent);
    };
    return fromEvent(window, 'gmapsReadyEvent');
  }
}
