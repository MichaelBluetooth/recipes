import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
})
export class JoinPipe implements PipeTransform {
    transform(value: string[] | string, joinVal: string): string {
        if (Array.isArray(value)) {
            return value.join(joinVal);
        } else {
            return value;
        }
    }
}
