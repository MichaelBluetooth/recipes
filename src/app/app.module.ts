import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IngredientListComponent } from './ingredients/ingredients-list/ingredients-list.component';
import { IngredientDetailsComponent } from './ingredients/ingredient-detail/ingredient-detail.component';
import { IngredientService } from './ingredients/ingredient.service';

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    IngredientDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [IngredientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
