import { Recipe } from './../../../models/recipe';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe = new Recipe();

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      if (routeData.recipe) {
        this.recipe = routeData.recipe;
      } else {
        this.recipe = new Recipe();
      }
    });
  }

  create() {
    if (this.recipe._id) {
      this.recipeService.updateRecipe(this.recipe).then((createdRecipe: Recipe) => {
        this.router.navigate(['recipes', createdRecipe._id]);
      });
    } else {
      this.recipeService.createRecipe(this.recipe).then((createdRecipe: Recipe) => {
        this.router.navigate(['recipes', createdRecipe._id]);
      });
    }
  }

  delete() {
    const confirmed = confirm('Are you sure you want to delete this recipe? This cannot be undone.');
    if (confirmed) {
      this.recipeService.deleteRecipe(this.recipe._id).then(() => {
        this.router.navigate(['recipes']);
      });
    }
  }
}
