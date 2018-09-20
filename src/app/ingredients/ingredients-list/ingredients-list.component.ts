import { Ingredient } from './../ingredient';
import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css'],
})
export class IngredientListComponent implements OnInit {

  ingredients: Ingredient[];
  selectedIngredient: Ingredient;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientService
      .getIngredients()
      .then((ingredients: Ingredient[]) => {
        this.ingredients = ingredients.map((ingredient) => {
          return ingredient;
        });
      });
  }

  private getIndexOfIngredient = (ingredientId: String) => {
    return this.ingredients.findIndex((ingredient) => {
      return ingredient._id === ingredientId;
    });
  }

  selectIngredient(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
  }

  createNewIngredient() {
    const ingredient: Ingredient = {
      name: ''
    };

    // By default, a newly-created ingredient will have the selected state.
    this.selectIngredient(ingredient);
  }

  deleteIngredient = (ingredientId: String) => {
    const idx = this.getIndexOfIngredient(ingredientId);
    if (idx !== -1) {
      this.ingredients.splice(idx, 1);
      this.selectIngredient(null);
    }
    return this.ingredients;
  }

  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.selectIngredient(ingredient);
    return this.ingredients;
  }

  updateIngredient = (ingredient: Ingredient) => {
    const idx = this.getIndexOfIngredient(ingredient._id);
    if (idx !== -1) {
      this.ingredients[idx] = ingredient;
      this.selectIngredient(ingredient);
    }
    return this.ingredients;
  }
}