import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs';
  opened: boolean = false;

  toggleSidenav($event) {
    this.opened = $event;
  }
}
