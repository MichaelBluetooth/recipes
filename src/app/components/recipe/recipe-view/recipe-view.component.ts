import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../models/recipe';
import { RecipeService } from '../../../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      this.recipe = routeData.recipe;
    });
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
