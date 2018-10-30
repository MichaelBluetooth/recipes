import { Component, OnInit } from '@angular/core';
import { GroceryItem } from 'src/app/models/groceryitem';
import { GroceryItemService } from 'src/app/services/grocery/grocery-item.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grocery-item-edit',
  templateUrl: './grocery-item-edit.component.html',
  styleUrls: ['./grocery-item-edit.component.css']
})
export class GroceryItemEditComponent implements OnInit {

  groceryItem: GroceryItem = new GroceryItem();
  groceryItemDefinition: any;

  constructor(private groceryItemService: GroceryItemService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      if (routeData.groceryitem) {
        this.groceryItem = routeData.groceryitem;
      } else {
        this.groceryItem = new GroceryItem();
      }
    });

    this.groceryItemService.getGroceryItemMetadata().then(recipeDefinition => {
      this.groceryItemDefinition = recipeDefinition;
    });
  }

  create() {
    if (this.groceryItem._id) {
      this.groceryItemService.updateGroceryItem(this.groceryItem).then((created: GroceryItem) => {
        this.router.navigate(['groceryitems']);
      });
    } else {
      this.groceryItemService.createGroceryItem(this.groceryItem).then((created: GroceryItem) => {
        this.router.navigate(['groceryitems']);
      });
    }
  }

  delete() {
    const confirmed = confirm('Are you sure you want to delete this grocery item? This cannot be undone.');
    if (confirmed) {
      this.groceryItemService.deleteGroceryItem(this.groceryItem._id).then(() => {
        this.router.navigate(['groceryitems']);
      });
    }
  }

}
