import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  clicked(){
    var  butt = document.getElementById("buttonAnim")
    butt?.classList.add("load")

    setTimeout(() => {
    butt?.classList.add("done")
      
    }, 1000);

    
  }

}
