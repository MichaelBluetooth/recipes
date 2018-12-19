import { SpinnerService, SpinnerStatus } from './../../services/spinner/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner = false;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.spinnerStatus.subscribe(status => {
      this.showSpinner = status === SpinnerStatus.start;
    });
  }
}
