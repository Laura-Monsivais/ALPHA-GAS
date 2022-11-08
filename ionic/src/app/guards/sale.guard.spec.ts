import { TestBed } from '@angular/core/testing';

import { SaleGuard } from './sale.guard';

describe('SaleGuard', () => {
  let guard: SaleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SaleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
