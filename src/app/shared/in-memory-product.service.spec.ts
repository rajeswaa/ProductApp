import { TestBed } from '@angular/core/testing';

import { InMemoryProductService } from './in-memory-product.service';

describe('InMemoryProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryProductService = TestBed.get(InMemoryProductService);
    expect(service).toBeTruthy();
  });
});
