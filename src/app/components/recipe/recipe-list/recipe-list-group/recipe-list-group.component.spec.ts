import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListGroupComponent } from './recipe-list-group.component';

describe('RecipeListGroupComponent', () => {
  let component: RecipeListGroupComponent;
  let fixture: ComponentFixture<RecipeListGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
