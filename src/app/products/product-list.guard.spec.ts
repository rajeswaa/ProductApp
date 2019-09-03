import { TestBed, async, inject } from '@angular/core/testing';

import { ProductListGuard } from './product-list.guard';

describe('ProductListGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductListGuard]
    });
  });

  it('should ...', inject([ProductListGuard], (guard: ProductListGuard) => {
    expect(guard).toBeTruthy();
  }));
});
