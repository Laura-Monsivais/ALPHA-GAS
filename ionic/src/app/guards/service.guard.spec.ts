import { TestBed } from '@angular/core/testing';

import { ServiceGuard } from './Service.guard';

describe('ServiceGuard', () => {
  let guard: ServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
