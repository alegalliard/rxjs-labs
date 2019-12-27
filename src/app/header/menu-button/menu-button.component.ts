import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent  {
  @Input() opened: boolean;

  switchIcons() {
    if(this.opened){
      return 'menu_open';
    }
    return 'menu';
  }

}
