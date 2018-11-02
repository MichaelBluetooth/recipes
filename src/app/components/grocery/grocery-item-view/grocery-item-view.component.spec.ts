import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryItemViewComponent } from './grocery-item-view.component';

describe('GroceryItemViewComponent', () => {
  let component: GroceryItemViewComponent;
  let fixture: ComponentFixture<GroceryItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
