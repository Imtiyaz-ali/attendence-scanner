import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-project';
  show = true
  password = "";
  isLightMode = true
  getValue() {
    return "haha"
  }
  doThis() {
    alert("You clicked")
  }
  update(value: string) {
    this.password = value;
    this.show = !this.show;

  }

  switchMode() {
    var modeSwitch = document.querySelector('.mode-switch');
    document.documentElement.classList.toggle('light');
    modeSwitch!.classList.toggle('active');
    this.isLightMode = !this.isLightMode
  }



}
