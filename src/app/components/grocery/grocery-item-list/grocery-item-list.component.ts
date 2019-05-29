import { GroceryPackage } from './../../../models/grocerypackage';
import { BarcodeScannerService } from './../../../services/barcode-scanner/barcode-scanner.service';
import { GroceryItem } from './../../../models/groceryitem';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { GroceryPackageService } from 'src/app/services/grocery/grocery-package.service';

@Component({
  selector: 'app-grocery-item-list',
  templateUrl: './grocery-item-list.component.html',
  styleUrls: ['./grocery-item-list.component.css']
})
export class GroceryItemListComponent implements OnInit {

  groceryItems: GroceryItem[] = [];
  scannerRunning = false;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private packagesService: GroceryPackageService,
    private barcodeScannerService: BarcodeScannerService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      this.groceryItems = routeData.groceryitems;
    });
  }

  startScanner() {
    this.scannerRunning = true;
    this.barcodeScannerService.startScanner('#scanner-container')
      .pipe(distinctUntilChanged())
      .subscribe(barcodeSearch => {
        this.barcodeScannerService.stopScanner();
        this.scannerRunning = false;

        this.packagesService.searchGroceryPackages({ 'groceryItem.barcode': barcodeSearch }).then((pkgs: GroceryPackage[]) => {
          if (pkgs && pkgs.length > 0) {
            this.router.navigate(['groceryitems', pkgs[0].groceryItem._id]);
          } else {
            alert(`No items matching barcode ${barcodeSearch} found`);
          }
        });
      });
  }
}
