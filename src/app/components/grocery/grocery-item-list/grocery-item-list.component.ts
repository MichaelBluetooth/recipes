import { GroceryItem } from './../../../models/groceryitem';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grocery-item-list',
  templateUrl: './grocery-item-list.component.html',
  styleUrls: ['./grocery-item-list.component.css']
})
export class GroceryItemListComponent implements OnInit {

  groceryItems: GroceryItem[] = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((routeData) => {
      this.groceryItems = routeData.groceryitems;
    });
  }
}
