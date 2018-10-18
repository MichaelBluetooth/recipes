import { Recipe } from './../../../../models/recipe';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-list-group',
  templateUrl: './recipe-list-group.component.html',
  styleUrls: ['./recipe-list-group.component.css']
})
export class RecipeListGroupComponent {
  @Input() recipes: Recipe[] = [];
}
