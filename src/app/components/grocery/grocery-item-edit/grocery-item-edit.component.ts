import { Component, OnInit } from '@angular/core';
import { GroceryItem } from 'src/app/models/groceryitem';
import { GroceryItemService } from 'src/app/services/grocery/grocery-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroceryPackage } from 'src/app/models/grocerypackage';
import { GroceryPackageService } from 'src/app/services/grocery/grocery-package.service';

@Component({
  selector: 'app-grocery-item-edit',
  templateUrl: './grocery-item-edit.component.html',
  styleUrls: ['./grocery-item-edit.component.css']
})
export class GroceryItemEditComponent implements OnInit {

  groceryItem: GroceryItem = new GroceryItem();
  groceryItemDefinition: any;
  groceryPackages: GroceryPackage[] = [];
  groceryPackageDefinition: any;

  constructor(private groceryItemService: GroceryItemService,
    private groceryPackageService: GroceryPackageService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      if (routeData.groceryitem) {
        this.groceryItem = routeData.groceryitem;
      } else {
        this.groceryItem = new GroceryItem();
      }

      if (routeData.grocerypackages) {
        this.groceryPackages = routeData.grocerypackages;
      }
    });

    this.groceryItemService.getGroceryItemMetadata().then(groceryItemDefinition => {
      this.groceryItemDefinition = groceryItemDefinition;
    });

    this.groceryPackageService.getGroceryPackageMetadata().then(groceryPackageDefinition => {
      this.groceryPackageDefinition = groceryPackageDefinition;
    });
  }

  create() {
    if (this.groceryItem._id) {
      this.groceryItemService.updateGroceryItem(this.groceryItem).then((created: GroceryItem) => {
        this.createOrUpdatePackages().then(() => {
          this.router.navigate(['groceryitems/' + this.groceryItem._id]);
        });
      });
    } else {
      this.groceryItemService.createGroceryItem(this.groceryItem).then((created: GroceryItem) => {
        this.createOrUpdatePackages().then(() => {
          this.router.navigate(['groceryitems/' + this.groceryItem._id]);
        });
      });
    }
  }

  createOrUpdatePackages() {
    return new Promise(resolve => {
      const promises = [];
      this.groceryPackages.forEach((pkg: GroceryPackage) => {
        pkg.groceryItem = this.groceryItem;
        if (pkg._id) {
          promises.push(this.groceryPackageService.updateGroceryPackage(pkg));
        } else {
          promises.push(this.groceryPackageService.createGroceryPackage(pkg));
        }
      });

      Promise.all(promises).then(() => {
        resolve();
      });
    });
  }

  addNewPackage() {
    this.groceryPackages = [new GroceryPackage()].concat(this.groceryPackages);
  }

  deletePackage(idx: number) {
    if (this.groceryPackages[idx]._id) {
      if (confirm('Are you sure you want to delete this grocery package? This cannot be un-done.')) {
        this.groceryPackageService.deleteGroceryPackage(this.groceryPackages[idx]._id).then(() => {
          this.groceryPackages.splice(idx, 1);
        });
      }
    } else {
      this.groceryPackages.splice(idx, 1);
    }
  }

}
