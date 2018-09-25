import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort',
})
export class SortPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
        array.sort((a: any, b: any) => {
            const aValue = a[field] ? a[field] : null;
            const bValue = b[field] ? b[field] : null;
            if (aValue > bValue ) {
                return -1;
            } else if (aValue < bValue) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
