import { TestBed } from '@angular/core/testing';

import { SelfConsumptionGuard } from './self-consumption.guard';

describe('SelfConsumptionGuard', () => {
  let guard: SelfConsumptionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelfConsumptionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
