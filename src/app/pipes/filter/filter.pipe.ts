import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(values: any[], filterField: string, filterValue: string): any[] {
        return values.filter(value => {
            return value[filterField] === filterValue;
        });
    }
}
