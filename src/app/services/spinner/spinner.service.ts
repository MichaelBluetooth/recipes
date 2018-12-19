import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum SpinnerStatus {
  start,
  stop
}

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinnerStatus: Subject<SpinnerStatus> = new Subject<SpinnerStatus>();

  public updateSpinner(status: SpinnerStatus): void {
    this.spinnerStatus.next(status);
  }
}
