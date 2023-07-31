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
      img: 'assets/kashi.jpg'
    },
    '8842CS20': {
      user_name: 'Govind P',
      roll: 26,
      stream: 'CS',
      img: 'assets/govind.jpg'
    },
    '9094CS20': {
      user_name: 'AlanSavio',
      roll: 7,
      stream: 'CS',
      img: 'assets/savio.jpg'
    }
  };

  teachers:Teachers={
    '1234': {
      user_name: 'ManJu',
      class: 27,
      subject: "Python Programming",
      img: "assets/test.jpeg"
    },
    '5678': {
      user_name: 'Apple Miss',
      class: 10,
      subject: "Discrete Math",
      img: "assets/test.jpeg"
    },
    '9076': {
      user_name: 'Cat',
      class: 27,
      subject: "Political Science",
      img: "assets/test.jpeg"
    }
  }

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

interface Teacher{
  user_name: string;
  class: number;
  subject: string;
  img: string;
}
interface Teachers {
  [key: string]: Teacher;
}

