import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  @Input() hide = true;
  @Output() hideChange = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  toggle() {
    this.hide = !this.hide;
    this.hideChange.emit(this.hide);
  }

  navigate(route: string) {
    this.toggle();
    this.router.navigate(['/' + route]);
  }
}
