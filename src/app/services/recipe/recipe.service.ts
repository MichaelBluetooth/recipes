import { Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { Http } from '@angular/http';
import { Recipe } from '../../models/recipe';

@Injectable()
export class RecipeService {

  private recipesUrl = '/api/recipes';

  constructor(private http: Http, private errorService: ErrorService) { }

  getRecipes(): Promise<void | Recipe[]> {
    return this.http.get(this.recipesUrl)
      .toPromise()
      .then(response => response.json() as Recipe[])
      .catch(this.errorService.handleError);
  }

  getRecipe(getRecipeId): Promise<void | Recipe> {
    return this.http.get(this.recipesUrl + '/' + getRecipeId)
      .toPromise()
      .then(response => response.json() as Recipe)
      .catch(this.errorService.handleError);
  }

  createRecipe(newRecipe: Recipe): Promise<void | Recipe> {
    return this.http.post(this.recipesUrl, newRecipe)
      .toPromise()
      .then(response => response.json() as Recipe)
      .catch(this.errorService.handleError);
  }

  deleteRecipe(delRecipeId: String): Promise<void | String> {
    return this.http.delete(this.recipesUrl + '/' + delRecipeId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorService.handleError);
  }

  updateRecipe(putRecipe: Recipe): Promise<void | Recipe> {
    const putUrl = this.recipesUrl + '/' + putRecipe._id;
    return this.http.put(putUrl, putRecipe)
      .toPromise()
      .then(response => response.json() as Recipe)
      .catch(this.errorService.handleError);
  }
}
