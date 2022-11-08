import { TestBed } from '@angular/core/testing';

import { RoutePlaceService } from './route-place.service';

describe('RoutePlaceService', () => {
  let service: RoutePlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutePlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
