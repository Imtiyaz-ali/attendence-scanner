import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  ngOnInit(): void { }

  showMobileNav = false
  mobileNav() {
    

  }
}
