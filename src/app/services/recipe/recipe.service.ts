import { Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { Http } from '@angular/http';
import { Recipe } from '../../models/recipe';
import { delay } from 'rxjs/operators';

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

  setFavorite(id: string, favorite: boolean): Promise<void | Recipe> {
    const putUrl = this.recipesUrl + '/' + id;
    return this.http.put(putUrl, { favorite: favorite })
      .toPromise()
      .then(response => response.json() as Recipe)
      .catch(this.errorService.handleError);
  }

  getRecipeMetadata(): Promise<void | any> {
    return Promise.resolve(
      {
        layout: [['name'], ['description'], ['category'], ['instructions'], ['ingredients'], ['notes']],
        fields: [
          {
            name: 'name',
            label: 'Name',
            fieldType: 'Text',
            readOnly: false,
            focus: true,
            validations: [{name: 'Required'}]
          },
          {
            name: 'description',
            label: 'Description',
            fieldType: 'Memo',
            readOnly: false,
            rows: 3
          },
          {
            name: 'category',
            label: 'Category',
            fieldType: 'List',
            readOnly: false,
            listOptions: ['', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']
          },
          {
            name: 'ingredients',
            label: 'Ingredients',
            fieldType: 'Memo',
            readOnly: false,
            rows: 5,
            validations: [{name: 'Required'}]
          },
          {
            name: 'instructions',
            label: 'Instructions',
            fieldType: 'Memo',
            readOnly: false,
            rows: 5,
            validations: [{name: 'Required'}]
          },
          {
            name: 'notes',
            label: 'Notes',
            fieldType: 'Memo',
            readOnly: false,
            rows: 5
          }
        ]
      });
  }
}
