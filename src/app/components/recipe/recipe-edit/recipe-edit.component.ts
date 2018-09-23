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

  id: string;
  name: string;
  category: string;
  ingredients: string;
  instructions: string;
  notes: string;

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      if (routeData.recipe) {
        this.id = routeData.recipe._id;
        this.name = routeData.recipe.name;
        this.category = routeData.recipe.category;
        this.ingredients = routeData.recipe.ingredients.join('\n');
        this.instructions = routeData.recipe.instructions.join('\n');
        this.notes = routeData.recipe.notes;
      } else {
        this.id = null;
        this.name = null;
        this.notes = null;
        this.ingredients = null;
        this.instructions = null;
        this.category = null;
      }
    });
  }

  create() {
    const recipe = new Recipe();
    recipe._id = this.id;
    recipe.name = this.name;
    recipe.category = this.category;
    recipe.instructions = this.instructions.split('\n').filter(i => i !== '');
    recipe.ingredients = this.ingredients.split('\n').filter(i => i !== '');
    recipe.notes = this.notes;
    if (this.id) {
      this.recipeService.updateRecipe(recipe).then((createdRecipe: Recipe) => {
        this.router.navigate(['recipes', createdRecipe._id]);
      });
    } else {
      this.recipeService.createRecipe(recipe).then((createdRecipe: Recipe) => {
        this.router.navigate(['recipes', createdRecipe._id]);
      });
    }
  }

  getButtonText(): string {
    return this.id ? 'Edit' : 'Create';
  }

  delete() {
    this.recipeService.deleteRecipe(this.id).then(() => {
      this.router.navigate(['recipes']);
    });
  }
}
