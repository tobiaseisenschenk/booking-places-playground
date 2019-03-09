import { TestBed } from "@angular/core/testing";

import { PlacesService } from "./places.service";

describe("PlacesService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PlacesService = TestBed.get(PlacesService);
    expect(service).toBeTruthy();
  });

  it("should return the current latitude and longitute", () => {
    const service: PlacesService = TestBed.get(PlacesService);
    service.getLatLong().subscribe(value => {
      expect(value.lat).toBeDefined();
      expect(value.long).toBeDefined();
    });
  });

  it("should return a list of nearby places", () => {
    const service: PlacesService = TestBed.get(PlacesService);
    service.getLPlaces().subscribe(value => {
      expect(value.long).toBeDefined();
    });
  });
});
