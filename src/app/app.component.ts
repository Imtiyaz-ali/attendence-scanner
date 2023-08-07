import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogInService } from './services/login.service';
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  //  the constructor used to inject any dependencies that the component or service requires.
  constructor(private http: HttpClient, private LogInServices: LogInService) { }

  // basic variables
  teacher_logged = false
  teacher_name = ""
  teacher_profile = "assets/test.jpeg"

  // to validate teacher input
  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  ngOnInit(): void {
    // if(localStorage.setItem("userLoggedIn", currentUser.id)
    if(localStorage.getItem("loggedUser")){
      this.teacher_logged = true
    }
  }

  // function for securely login of teacher
  logIn() {
    // if user has valid data enter
    if (this.loginForm.invalid) {
      alert("LogIn Form Is INvalid")
      return
    }

    // get attendece data
    this.LogInServices.getUser('teacher').subscribe((res: any[]) => {

      // if given id present in database
      if (res.find((element: any) => element.id == this.loginForm.value.id)) {

        // store current status of database|found/Notfound|
        let currentUser = res.find((element: any) => element.id == this.loginForm.value.id)

        // if found data in database
        if (currentUser) {
          // check for password
          if (currentUser.password == this.loginForm.value.password) {

            // update variable
            this.teacher_name = currentUser.name

            // storing data internally 
            localStorage.setItem("loggedUser", currentUser.id)

            if (currentUser.admin) {
              localStorage.setItem("admin", currentUser.id)
            }
            this.teacher_logged  =true
          } else {
            alert("Wrong password")
          }
        }
      } else {
        alert("No user found")
      }
    })
  }

  // 
  logout(){
    localStorage.clear()
    this.teacher_logged = false
  }

  // switch to dark mode
  switchMode() {
    var modeSwitch = document.querySelector('.mode-switch');
    document.documentElement.classList.toggle('light');
    modeSwitch!.classList.toggle('active');
  }

}


