import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split',
})
export class SplitPipe implements PipeTransform {
    transform(value: string | string[], splitVal: string): string[] {
        if (Array.isArray(value)) {
            return value;
        } else {
            return value.split(splitVal);
        }
    }
}
