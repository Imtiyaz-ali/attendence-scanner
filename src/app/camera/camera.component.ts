import { Component, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent  {
  @ViewChild('action') scanner?: NgxScannerQrcodeComponent;

  message = "Camera Is Loading"
  loading = true
  qrscanned = false
  user_name= ""
  roll = 0
  stream = "CS"
  id = ""

  users: Users= {
    '9155CS20': {
      name: 'Imtiyaz-Ali',
      roll: 27,
      stream:"CS"
    },
    '9028CS20': {
      name: 'Kashinath S',
      roll: 30,
      stream:"CS"
    },
  };

  checkUser(key:any){
    // const user = key[0]["value"]
    
    for(let ket in this.users){
      if(ket==key){
        this.user_name = this.users[key as keyof Users].name;
        this.roll = this.users[key as keyof Users].roll;
        this.id = key;
        return true
      }
    }
    

    return false
  }
  
  

  ngAfterViewInit() {
    setTimeout(() => {   
      this.loading = false;
    }, 3000);
    setTimeout(() => {
      this.scanning()
      
    }, 4000);
  }

  ngOnDestroy() {
    if (
      this.scanner?.isStart
    ) {
      this.scanner?.stop()
      this.loading = true
    }
  }

  scanning(){
    setTimeout(() => {
      this.loading= false
    }, 2000);
    try {
      if (this.scanner && !this.scanner.isStart) {
        this.scanner.start();
      } else {
        console.log("Scanner already running.");
      }
    } catch (eror:any) {
      this.message = eror.toString();
      console.log("Error starting scanner:", eror)
      }
  }

  scanSuccessHandler(result: any) {
    console.log(result)
    const userData = result[0]["value"] as string
    // const userData = result

    this.scanner?.pause()

    const user_found = this.checkUser(userData)

    console.log(user_found)

    const alerting = document.getElementById("alerting");
    const falerting = document.getElementById("alertingfail");

    var  butt = user_found?document.getElementById("buttonAnim"):document.getElementById("buttonAnim1")


    setTimeout(() => {
      
      butt?.classList.add("load")
    }, 1);

    if(user_found==true){
      alerting?.classList.add('showAlert')
      const a = "userData"
  
    }else{
      falerting?.classList.add('showAlert')
    }

    setTimeout(() => {
    butt?.classList.add("done")
      
    }, 500);
    setTimeout(() => {
      butt?.classList.remove("load")
      butt?.classList.remove("done")


      if(user_found){
        alerting?.classList.remove('showAlert')
      }else{
        falerting?.classList.remove('showAlert')
      }

      this.user_name = ""
      this.roll = 0;
      this.id = ""

    this.scanner?.play()

      
    }, 1300);
    // console.log("done")
    // this.scanner?.stop(); // stop the camera
  }
}
interface User {
  name: string;
  roll: number;
  stream: string;
}

interface Users {
  [key: string]: User;
}
