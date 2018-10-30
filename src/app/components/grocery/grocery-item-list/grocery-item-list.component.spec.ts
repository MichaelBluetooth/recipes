import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryItemListComponent } from './grocery-item-list.component';

describe('GroceryItemListComponent', () => {
  let component: GroceryItemListComponent;
  let fixture: ComponentFixture<GroceryItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
