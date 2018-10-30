import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryItemEditComponent } from './grocery-item-edit.component';

describe('GroceryItemEditComponent', () => {
  let component: GroceryItemEditComponent;
  let fixture: ComponentFixture<GroceryItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
