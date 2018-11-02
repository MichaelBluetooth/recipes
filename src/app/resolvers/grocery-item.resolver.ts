import { GroceryItem } from './../models/groceryitem';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroceryItemService } from '../services/grocery/grocery-item.service';
import { GroceryPackageService } from '../services/grocery/grocery-package.service';

@Injectable()
export class GroceryItemResolver implements Resolve<GroceryItem> {
    constructor(private groceryItemService: GroceryItemService, private groceryPkgService: GroceryPackageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GroceryItem> | Promise<GroceryItem> | any {
        return this.groceryItemService.getGroceryItem(route.params.id);
    }
}
