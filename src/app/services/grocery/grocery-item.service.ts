import { Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { Http } from '@angular/http';
import { GroceryItem } from 'src/app/models/groceryitem';

@Injectable()
export class GroceryItemService {

  private groceryItemsUrl = '/api/groceryitems';

  constructor(private http: Http, private errorService: ErrorService) { }

  getGroceryItems(): Promise<void | GroceryItem[]> {
    return this.http.get(this.groceryItemsUrl)
      .toPromise()
      .then(response => response.json() as GroceryItem[])
      .catch(this.errorService.handleError);
  }

  getGroceryItem(getGroceryItemId): Promise<void | GroceryItem> {
    return this.http.get(this.groceryItemsUrl + '/' + getGroceryItemId)
      .toPromise()
      .then(response => response.json() as GroceryItem)
      .catch(this.errorService.handleError);
  }

  createGroceryItem(newGroceryItem: GroceryItem): Promise<void | GroceryItem> {
    return this.http.post(this.groceryItemsUrl, newGroceryItem)
      .toPromise()
      .then(response => response.json() as GroceryItem)
      .catch(this.errorService.handleError);
  }

  deleteGroceryItem(delGroceryItemId: String): Promise<void | String> {
    return this.http.delete(this.groceryItemsUrl + '/' + delGroceryItemId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorService.handleError);
  }

  updateGroceryItem(putGroceryItem: GroceryItem): Promise<void | GroceryItem> {
    const putUrl = this.groceryItemsUrl + '/' + putGroceryItem._id;
    return this.http.put(putUrl, putGroceryItem)
      .toPromise()
      .then(response => response.json() as GroceryItem)
      .catch(this.errorService.handleError);
  }

  setFavorite(id: string, favorite: boolean): Promise<void | GroceryItem> {
    const putUrl = this.groceryItemsUrl + '/' + id;
    return this.http.put(putUrl, { favorite: favorite })
      .toPromise()
      .then(response => response.json() as GroceryItem)
      .catch(this.errorService.handleError);
  }

  getGroceryItemMetadata(): Promise<void | any> {
    return Promise.resolve(
      {
        layout: [['name']],
        fields: [
          {
            name: 'name',
            label: 'Name',
            fieldType: 'Text',
            readOnly: false,
            validations: [{ name: 'Required' }]
          }
        ]
      });
  }
}
