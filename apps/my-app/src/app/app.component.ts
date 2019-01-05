import { Component } from '@angular/core';

@Component({
  selector: 'lazy-angularjs-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuOpen = false;
  modernMenuOpen = false;

  onClick() {
    this.menuOpen = !this.menuOpen;
  }

  onModernClick() {
    this.modernMenuOpen = !this.modernMenuOpen;
  }
}
