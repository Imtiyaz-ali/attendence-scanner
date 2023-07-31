import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  switchMode() {
    var modeSwitch = document.querySelector('.mode-switch');
    document.documentElement.classList.toggle('light');
    modeSwitch!.classList.toggle('active');

  }


  // mobile nav
  showMobileNav = false
  mobileNav(){
    this.showMobileNav = !this.showMobileNav
    const button: any = document.querySelector('.menu__button');
    const menu: any = document.querySelector('.menu__body');
    if (this.showMobileNav) {
    
      menu.removeAttribute('hidden');
      
    } else {
      menu.setAttribute('hidden', '');
    }
  }

}
