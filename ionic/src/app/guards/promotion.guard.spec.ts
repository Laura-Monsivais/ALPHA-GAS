import { TestBed } from '@angular/core/testing';

import { PromotionGuard } from './promotion.guard';

describe('PromotionGuard', () => {
  let guard: PromotionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PromotionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
