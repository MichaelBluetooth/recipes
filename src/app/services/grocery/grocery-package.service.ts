import { Injectable } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { Http } from '@angular/http';
import { GroceryPackage } from 'src/app/models/grocerypackage';

@Injectable()
export class GroceryPackageService {

  private groceryPackagesUrl = '/api/grocerypackages';

  constructor(private http: Http, private errorService: ErrorService) { }

  searchGroceryPackages(srch: any): Promise<void | GroceryPackage[]> {
    return this.http.get(this.groceryPackagesUrl + '/search?q=' + JSON.stringify(srch))
      .toPromise()
      .then(response => response.json() as GroceryPackage[])
      .catch(this.errorService.handleError);
  }

  getGroceryPackages(): Promise<void | GroceryPackage[]> {
    return this.http.get(this.groceryPackagesUrl)
      .toPromise()
      .then(response => response.json() as GroceryPackage[])
      .catch(this.errorService.handleError);
  }

  getGroceryPackage(getGroceryPackageId): Promise<void | GroceryPackage> {
    return this.http.get(this.groceryPackagesUrl + '/' + getGroceryPackageId)
      .toPromise()
      .then(response => response.json() as GroceryPackage)
      .catch(this.errorService.handleError);
  }

  createGroceryPackage(newGroceryPackage: GroceryPackage): Promise<void | GroceryPackage> {
    return this.http.post(this.groceryPackagesUrl, newGroceryPackage)
      .toPromise()
      .then(response => response.json() as GroceryPackage)
      .catch(this.errorService.handleError);
  }

  deleteGroceryPackage(delGroceryPackageId: String): Promise<void | String> {
    return this.http.delete(this.groceryPackagesUrl + '/' + delGroceryPackageId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorService.handleError);
  }

  updateGroceryPackage(putGroceryPackage: GroceryPackage): Promise<void | GroceryPackage> {
    const putUrl = this.groceryPackagesUrl + '/' + putGroceryPackage._id;
    return this.http.put(putUrl, putGroceryPackage)
      .toPromise()
      .then(response => response.json() as GroceryPackage)
      .catch(this.errorService.handleError);
  }

  setFavorite(id: string, favorite: boolean): Promise<void | GroceryPackage> {
    const putUrl = this.groceryPackagesUrl + '/' + id;
    return this.http.put(putUrl, { favorite: favorite })
      .toPromise()
      .then(response => response.json() as GroceryPackage)
      .catch(this.errorService.handleError);
  }

  getGroceryPackageMetadata(): Promise<void | any> {
    return Promise.resolve(
      {
        layout: [['quantity', 'barcode']],
        fields: [
          {
            name: '_id',
            label: 'ID',
            fieldType: 'Text',
            readOnly: false,
            validations: [{ name: 'Required' }]
          },
          {
            name: 'barcode',
            label: 'Barcode',
            fieldType: 'Text',
            readOnly: false,
            validations: [{ name: 'Required' }]
          },
          {
            name: 'quantity',
            label: 'Quantity',
            fieldType: 'Number',
            readOnly: false
          },
          // {
          //   name: 'unit',
          //   label: 'Unit',
          //   fieldType: 'Relationship',
          //   readOnly: false,
          //   displayNameField: 'name',
          //   relationshipServiceConfig: {
          //     pageSize: 5,
          //     filterField: 'name',
          //     controller: 'unitsofmeasure'
          //   }
          // },
          // {
          //   name: 'packageDescription',
          //   label: 'Description',
          //   fieldType: 'Text',
          //   readOnly: false
          // }
        ]
      });
  }
}
