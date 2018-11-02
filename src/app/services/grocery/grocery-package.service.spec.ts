import { TestBed } from '@angular/core/testing';

import { GroceryPackageService } from './grocery-package.service';

describe('GroceryPackageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroceryPackageService = TestBed.get(GroceryPackageService);
    expect(service).toBeTruthy();
  });
});
