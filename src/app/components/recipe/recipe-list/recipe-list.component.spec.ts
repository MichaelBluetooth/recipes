import { Observable } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { Recipe } from '../../../models/recipe';
import { resolve } from 'dns';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  const mockRecipeService = jasmine.createSpyObj('recipeService', ['getRecipes']);
  const mockRecipes: Recipe[] = [
    { name: 'Recipe 1', instructions: [], ingredients: [] },
    { name: 'Recipe 2', instructions: [], ingredients: [] },
    { name: 'Recipe 3', instructions: [], ingredients: [] }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RecipeListComponent],
      providers: [RecipeService, { provide: RecipeService, useValue: mockRecipeService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockRecipeService.getRecipes.and.returnValue(Promise.resolve(mockRecipes));
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the recipes on init', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.recipes).toEqual(mockRecipes);
      const recipes: DebugElement[] = fixture.debugElement.queryAll(By.css('.list-group-item'));
      expect(recipes.length).toBe(mockRecipes.length);
    });
    component.ngOnInit();
  }));
});
