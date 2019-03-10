import { PlacesService } from './places.service';
import { of } from 'rxjs';

describe('PlacesService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
  let placesService: PlacesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    placesService = new PlacesService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(placesService).toBeTruthy();
  });

  it('should return the current latitude and longitute', () => {
    httpClientSpy.post.and.returnValue(
      of({ location: { lat: 91283901, lng: 19827389 } })
    );
    placesService.getLatLng().subscribe(location => {
      expect(location.lat).toBe(91283901);
      expect(location.lng).toBe(19827389);
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });
  });
});
