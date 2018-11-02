import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RelationshipPickerService {
  constructor(private http: Http) { }

  getOptions(filterValue: string, config: any): Observable<any> {
    return this.http.get('api/' + config.controller)
      .pipe(map(opts => opts.json()))
      .pipe(map(opts => {
        opts = this.isEmptyFilter(filterValue) ? opts :
          opts.filter(opt => {
            return opt[config.filterField].toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
          });

        return {
          options: opts.slice(0, config.pageSize),
          resultsTruncated: opts.length > config.pageSize
        };
      }));
  }

  isEmptyFilter(filterValue: string) {
    return filterValue === null || filterValue === '' || filterValue === undefined;
  }
}
