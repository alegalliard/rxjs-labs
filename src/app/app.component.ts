import { Component } from '@angular/core';
import { Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs';
  opened: boolean = false;

  public constructor(
    private activatedRoute: Router
    ) {}

  toggleSidenav($event) {
    this.opened = $event;
  }

  changeTitle() {
    this.activatedRoute.events.subscribe(event => {
      if(event instanceof RoutesRecognized) {
        let route = event.state.root.firstChild;
        this.title = `${route.data.title}`;
      }
    })
    
    return this.title;
  }
}
