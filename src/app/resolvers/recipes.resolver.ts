import { RecipeService } from '../services/recipe/recipe.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';

@Injectable()
export class RecipesResolver implements Resolve<Recipe> {
    constructor(private recipeService: RecipeService) { }

    resolve(): Observable<Recipe> | Promise<any> | any {
        return this.recipeService.getRecipes();
    }
}
