import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../models/recipe';
import { RecipeService } from '../../../services/recipe/recipe.service';
import { SpinnerService, SpinnerStatus } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.css']
})
export class RecipeViewComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      this.recipe = routeData.recipe;
    });
  }

  delete() {
    const confirmed = confirm('Are you sure you want to delete this recipe? This cannot be undone.');
    if (confirmed) {
      this.spinnerService.updateSpinner(SpinnerStatus.start);
      this.recipeService.deleteRecipe(this.recipe._id).then(() => {
        this.spinnerService.updateSpinner(SpinnerStatus.stop);
        this.router.navigate(['recipes']);
      });
    }
  }

  getFavoriteClass() {
    return `pull-left clickable favorite-star fa ${this.recipe.favorite ? 'fa-star' : 'fa-star-o'} fa-2x`;
  }

  toggleFavorite() {
    this.recipe.favorite = !this.recipe.favorite;
    this.recipeService.setFavorite(this.recipe._id, this.recipe.favorite);
  }
}
