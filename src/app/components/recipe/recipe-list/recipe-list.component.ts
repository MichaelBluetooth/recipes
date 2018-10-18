import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  dinnerRecipes: Recipe[] = [];
  lunchRecipes: Recipe[] = [];
  breakfastRecipes: Recipe[] = [];
  dessertRecipes: Recipe[] = [];
  snackRecipes: Recipe[] = [];
  uncategorizedRecipes: Recipe[] = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      routeData.recipes.forEach(recipe => {
        switch (recipe.category) {
          case 'Dinner':
            this.dinnerRecipes.push(recipe);
            break;
          case 'Lunch':
            this.lunchRecipes.push(recipe);
            break;
          case 'Breakfast':
            this.breakfastRecipes.push(recipe);
            break;
          case 'Dessert':
            this.dessertRecipes.push(recipe);
            break;
          case 'Snack':
            this.snackRecipes.push(recipe);
            break;
          default:
            this.uncategorizedRecipes.push(recipe);
            break;
        }
      });
    });
  }
}
