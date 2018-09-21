import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
    public handleError(error: any): void {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
    }
}