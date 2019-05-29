import { WindowRefService } from './../../../services/window-ref/window-ref.service';
import { Component, OnInit } from '@angular/core';
import { GroceryItem } from 'src/app/models/groceryitem';
import { GroceryItemService } from 'src/app/services/grocery/grocery-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroceryPackage } from 'src/app/models/grocerypackage';
import { GroceryPackageService } from 'src/app/services/grocery/grocery-package.service';
import Quagga from 'quagga';

import { BarcodeScannerService } from 'src/app/services/barcode-scanner/barcode-scanner.service';
import { distinctUntilChanged } from 'rxjs/operators';

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
  scannerRunning = false;

  constructor(private groceryItemService: GroceryItemService,
    private groceryPackageService: GroceryPackageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private barcodeScannerService: BarcodeScannerService,
    private windowRef: WindowRefService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      if (routeData.groceryitem) {
        this.groceryItem = routeData.groceryitem;
      } else {
        this.groceryItem = new GroceryItem();
        const pkg = new GroceryPackage();
        pkg.quantity = 1;
        this.groceryPackages.push(pkg);
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
      this.groceryItemService.updateGroceryItem(this.groceryItem).then((updated: GroceryItem) => {
        this.createOrUpdatePackages().then(() => {
          this.router.navigate(['groceryitems/' + this.groceryItem._id]);
        });
      });
    } else {
      this.groceryItemService.createGroceryItem(this.groceryItem).then((created: GroceryItem) => {
        this.groceryItem = created;
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

  addNewPackage(barcode?: string) {
    const newPackage = new GroceryPackage();
    newPackage.quantity = 1;
    if (barcode) {
      newPackage.barcode = barcode;
    }
    this.groceryPackages = [newPackage].concat(this.groceryPackages);
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

  trackByFn(index: any, item: any) {
    return index;
  }

  startScanner() {
    this.scannerRunning = true;
    this.barcodeScannerService.startScanner('#scanner-container')
      .pipe(distinctUntilChanged())
      .subscribe(newBarcode => {
        this.addNewPackage(newBarcode);
        this.barcodeScannerService.stopScanner();
        this.scannerRunning = false;
      });
  }
}
