import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PlacesService } from './api/places/places.service';
import { of } from 'rxjs';
import { BookingService } from './api/booking/booking.service';

describe('AppComponent', () => {
  const placesServiceStub: Partial<PlacesService> = {
    injectPlaces: () => of(new Event('mock')),
    getMyPlaces: () => of([])
  };
  const bookingServiceStub: Partial<BookingService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        { provide: PlacesService, useValue: placesServiceStub },
        { provide: BookingService, useValue: bookingServiceStub }
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it(`should have as title 'booking-places'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('booking-places');
  });
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to booking-places!'
    );
  });
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to booking-places!'
    );
  });
});
