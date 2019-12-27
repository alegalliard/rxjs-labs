import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<boolean>();
  @Input() opened: boolean;
  constructor() { }

  ngOnInit() {
  }

  sidenavStatus() {
    this.toggleSidenav.emit(!this.opened)
  }
}
