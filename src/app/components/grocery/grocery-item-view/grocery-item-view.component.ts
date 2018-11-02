import { GroceryItemService } from './../../../services/grocery/grocery-item.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroceryItem } from 'src/app/models/groceryitem';
import { GroceryPackage } from 'src/app/models/grocerypackage';

@Component({
  selector: 'app-grocery-item-view',
  templateUrl: './grocery-item-view.component.html',
  styleUrls: ['./grocery-item-view.component.css']
})
export class GroceryItemViewComponent implements OnInit {

  groceryItem: GroceryItem;
  groceryItemFormDefinition: any;
  groceryPackages: GroceryPackage[];

  constructor(
    private groceryItemService: GroceryItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      if (routeData.groceryitem) {
        this.groceryItem = routeData.groceryitem;
      }

      if (routeData.grocerypackages) {
        this.groceryPackages = routeData.grocerypackages;
      }
    });

    this.groceryItemService.getGroceryItemMetadata().then((metadata) => {
      this.groceryItemFormDefinition = metadata;
      this.groceryItemFormDefinition.fields.forEach(field => {
        field.readOnly = true;
      });
    });
  }

  delete() {
    const confirmed = confirm('Are you sure you want to delete this grocery item and all its packages? This cannot be undone.');
    if (confirmed) {
      this.groceryItemService.deleteGroceryItem(this.groceryItem._id).then(() => {
        this.router.navigate(['groceryitems']);
      });
    }
  }

}
