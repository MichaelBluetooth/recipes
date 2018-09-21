import { Ingredient } from './ingredient';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class IngredientService {
  private ingredientsUrl = '/api/ingredients';

  constructor(private http: Http) { }

  // get("/api/ingredients")
  getIngredients(): Promise<void | Ingredient[]> {
    return this.http.get(this.ingredientsUrl)
      .toPromise()
      .then(response => response.json() as Ingredient[])
      .catch(this.handleError);
  }

  // post("/api/ingredients")
  createIngredient(newIngredient: Ingredient): Promise<void | Ingredient> {
    return this.http.post(this.ingredientsUrl, newIngredient)
      .toPromise()
      .then(response => response.json() as Ingredient)
      .catch(this.handleError);
  }
  
  // delete("/api/ingredients/:id")
  deleteIngredient(delIngredientId: String): Promise<void | String> {
    return this.http.delete(this.ingredientsUrl + '/' + delIngredientId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/ingredient/:id")
  updateIngredient(putIngredient: Ingredient): Promise<void | Ingredient> {
    const putUrl = this.ingredientsUrl + '/' + putIngredient._id;
    return this.http.put(putUrl, putIngredient)
      .toPromise()
      .then(response => response.json() as Ingredient)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
