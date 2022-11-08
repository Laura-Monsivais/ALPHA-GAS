import { TestBed } from '@angular/core/testing';

import { SubsidiaryGuard } from './subsidiary.guard';

describe('SubsidiaryGuard', () => {
  let guard: SubsidiaryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SubsidiaryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
