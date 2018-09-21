import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayForTextArea' })
export class ArrayForTextAreaPipe implements PipeTransform {
    transform(value: any[]): string {
        return value.join('\n\n');
    }
}
