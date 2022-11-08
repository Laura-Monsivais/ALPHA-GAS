import { TestBed } from '@angular/core/testing';

import { SelfConsumptionService } from './self-consumption.service';

describe('SelfConsumptionService', () => {
  let service: SelfConsumptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfConsumptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
