import { Component, Input } from '@angular/core';
import { Ingredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.css']
})

export class IngredientDetailsComponent {
  @Input()
  ingredient: Ingredient;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private ingredientService: IngredientService) {}

  createIngredient(ingredient: Ingredient) {
    this.ingredientService.createIngredient(ingredient).then((newIngredient: Ingredient) => {
      this.createHandler(newIngredient);
    });
  }

  updateIngredient(ingredient: Ingredient): void {
    this.ingredientService.updateIngredient(ingredient).then((updatedIngredient: Ingredient) => {
      this.updateHandler(updatedIngredient);
    });
  }

  deleteIngredient(ingredientId: String): void {
    this.ingredientService.deleteIngredient(ingredientId).then((deletedIngredientId: String) => {
      this.deleteHandler(deletedIngredientId);
    });
  }
}