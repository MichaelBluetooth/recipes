import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

import { Autosize } from 'ng-autosize';
import { NgAutoFormModule } from 'ng-auto-form-lib';

import { AppComponent } from './app.component';
import { ErrorService } from './services/error/error.service';
import { RecipeService } from './services/recipe/recipe.service';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './resolvers/recipe.resolver';
import { RecipeViewComponent } from './components/recipe/recipe-view/recipe-view.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { SortPipe } from './pipes/sort.pipe';
import { SplitPipe } from './pipes/split.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { RecipeListGroupComponent } from './components/recipe/recipe-list/recipe-list-group/recipe-list-group.component';
import { RecipesResolver } from './resolvers/recipes.resolver';
import { GroceryItemEditComponent } from './components/grocery/grocery-item-edit/grocery-item-edit.component';
import { GroceryItemService } from './services/grocery/grocery-item.service';
import { GroceryItemListComponent } from './components/grocery/grocery-item-list/grocery-item-list.component';
import { GroceryItemResolver } from './resolvers/grocery-item.resolver';
import { GroceryItemsResolver } from './resolvers/grocery-items.resolver';

const appRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipeListComponent,
    resolve: {
      recipes: RecipesResolver
    }
  },
  {
    path: 'recipes/new',
    component: RecipeEditComponent
  },
  {
    path: 'recipes/:id/edit',
    component: RecipeEditComponent,
    resolve: {
      recipe: RecipeResolver
    }
  },
  {
    path: 'recipes/:id',
    component: RecipeViewComponent,
    resolve: {
      recipe: RecipeResolver
    }
  },

  {
    path: 'groceryitems',
    component: GroceryItemListComponent,
    resolve: {
      groceryitems: GroceryItemsResolver
    }
  },
  {
    path: 'groceryitems/new',
    component: GroceryItemEditComponent
  },
  {
    path: 'groceryitems/:id/edit',
    component: GroceryItemEditComponent,
    resolve: {
      groceryitem: GroceryItemResolver
    }
  },

  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    Autosize,
    AppComponent,
    RecipeEditComponent,
    RecipeViewComponent,
    SplitPipe,
    RecipeListComponent,
    SortPipe,
    JoinPipe,
    FilterPipe,
    RecipeListGroupComponent,
    GroceryItemEditComponent,
    GroceryItemListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgAutoFormModule.forRoot({ relationshipService: null })
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ErrorService,
    RecipeService,
    RecipeResolver,
    RecipesResolver,
    GroceryItemService,
    GroceryItemResolver,
    GroceryItemsResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
