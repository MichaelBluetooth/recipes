import { TestBed } from '@angular/core/testing';

import { GroceryItemService } from './grocery-item.service';

describe('GroceryItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroceryItemService = TestBed.get(GroceryItemService);
    expect(service).toBeTruthy();
  });
});
