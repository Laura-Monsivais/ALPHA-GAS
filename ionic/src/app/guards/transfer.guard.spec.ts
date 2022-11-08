import { TestBed } from '@angular/core/testing';

import { TransferGuard } from './transfer.guard';

describe('TransferGuard', () => {
  let guard: TransferGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TransferGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
