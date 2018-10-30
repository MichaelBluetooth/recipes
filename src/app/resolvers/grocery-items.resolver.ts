import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroceryItemService } from '../services/grocery/grocery-item.service';
import { GroceryItem } from '../models/groceryitem';

@Injectable()
export class GroceryItemsResolver implements Resolve<GroceryItem> {
    constructor(private groceryItemService: GroceryItemService) { }

    resolve(): Observable<GroceryItem> | Promise<any> | any {
        return this.groceryItemService.getGroceryItems();
    }
}
