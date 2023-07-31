import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  // Users fake data
  users: Users = {
    '9155CS20': {
      user_name: 'Imtiyaz-Ali',
      roll: 27,
      stream: "CS",
      img: "assets/me.jpeg"
    },
    '9028CS20': {
      user_name: 'Kashinath S',
      roll: 30,
      stream: "CS",
      img: ''
    },
    '8842CS20': {
      user_name: 'Govind P',
      roll: 26,
      stream: 'CS',
      img: ''
    }
  };

}

interface User{
  user_name: string;
  roll: number;
  stream: string;
  img: string;
}
interface Users {
  [key: string]: User;
}
