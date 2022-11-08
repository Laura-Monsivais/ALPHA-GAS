import { TestBed } from '@angular/core/testing';

import { ExternalApiGuard } from './external-api.guard';

describe('ExternalApiGuard', () => {
  let guard: ExternalApiGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExternalApiGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
