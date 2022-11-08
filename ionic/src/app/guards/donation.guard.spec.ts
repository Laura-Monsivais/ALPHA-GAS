import { TestBed } from '@angular/core/testing';

import { DonationGuard } from './donation.guard';

describe('DonationGuard', () => {
  let guard: DonationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DonationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
