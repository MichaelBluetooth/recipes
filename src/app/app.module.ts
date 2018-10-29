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
    RecipeListGroupComponent
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
    RecipesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
