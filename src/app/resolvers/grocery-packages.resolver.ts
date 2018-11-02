import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroceryPackageService } from '../services/grocery/grocery-package.service';
import { GroceryPackage } from '../models/grocerypackage';

@Injectable()
export class GroceryPackagesResolver implements Resolve<GroceryPackage[]> {
    constructor(private groceryPkgService: GroceryPackageService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<GroceryPackage> | Promise<GroceryPackage> | any {
        return this.groceryPkgService.searchGroceryPackages({ 'groceryItem._id': route.params.id });
    }
}
