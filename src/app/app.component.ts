import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainMenuHidden = true;

  toggleMainMenuVisibility(): void {
    this.mainMenuHidden = !this.mainMenuHidden;
  }
}
