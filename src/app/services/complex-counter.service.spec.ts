import { TestBed } from '@angular/core/testing';

import { ComplexCounterService } from './complex-counter.service';

describe('ComplexCounterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplexCounterService = TestBed.get(ComplexCounterService);
    expect(service).toBeTruthy();
  });
});
