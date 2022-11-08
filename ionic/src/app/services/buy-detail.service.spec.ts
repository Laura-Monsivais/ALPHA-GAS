import { TestBed } from '@angular/core/testing';

import { BuyDetailService } from './buy-detail.service';

describe('BuyDetailService', () => {
  let service: BuyDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
