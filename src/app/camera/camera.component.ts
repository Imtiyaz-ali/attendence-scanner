

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import * as faceapi from 'face-api.js';
// import { catchError } from 'rxjs';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {


  // basic Variables
  show_timer = true
  flip_card = false;
  cameraloading = true;
  qrscanned = false;
  roll = 0;
  stream = "CS";
  id = "";
  modelloading = true;
  message = "Loading";
  faceRecoginising = false
  // 
  user_image = "assets/needs/frame.png"
  user_name = "Message"
  user_message = "Scan ID Card Below"

  // face
  face_scanning_interval: any;
  tries:number=3;


  // Elements and Components
  //help to access elements in html
  @ViewChild('action') scanner?: NgxScannerQrcodeComponent;
  @ViewChild('recogination') recogination?: NgxScannerQrcodeComponent;
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('canvasElement') canvasElement: any;
  @ViewChild('usermsg') usermsg!: ElementRef;


  // Users fake data
  users: Users = {
    '9155CS20': {
      user_name: 'Imtiyaz-Ali',
      roll: 27,
      stream: "CS",
      img: "assets/students/me.jpeg"
    },
    '9028CS20': {
      user_name: 'Kashinath S',
      roll: 30,
      stream: "CS",
      img: 'assets/students/kashi.jpg'
    },
    '8842CS20': {
      user_name: 'Govind P',
      roll: 26,
      stream: 'CS',
      img: 'assets/students/govind.jpg'
    },
    '9094CS20': {
      user_name: 'AlanSavio',
      roll: 7,
      stream: 'CS',
      img: 'assets/students/savio.jpg'
    }
  };

  // will run whren this function automatically when page first loaded
  async ngOnInit() {
    this.user_message = "Model is Loading";

  }

  //automatic run after whole page loaded
  async ngAfterViewInit() {

    setTimeout(() => {
        this.loadModels();
        this.user_name = "Message"
        this.user_message = "Scan Your ID Card"
      
        this.show_timer = false
        this.playUserAnim()
    }, 3000);
    this.scanner?.start()
  }

// will run when we leave this page
  ngOnDestroy() {
    if (this.scanner?.isStart) {
      this.scanner?.stop();
      this.modelloading = true;
      this.cameraloading = true;
    }
  }

  // custom load face recoginisation model in the page
  loadModels() {

  console.log("Model")
    const MODEL_URL = './assets/models/';
    const modelsToLoad = [
      faceapi.loadSsdMobilenetv1Model(MODEL_URL),
      faceapi.loadFaceLandmarkModel(MODEL_URL),
      faceapi.loadFaceRecognitionModel(MODEL_URL)
    ];

    // assure the model is loaded
    Promise.all(modelsToLoad)
      .then(() => {
        this.user_message = "Scan Your ID-Card"
        console.log("Model loaded successfully");
      })
      .catch((error) => {
        this.user_message = "Error On Model Loading"
        this.message = "Error: " + error;
      });
  }

// check if student present in database or not
  checkUser(key: any) {
    for (let keys in this.users) {
      if (key === keys) {
        this.user_name = this.users[key as keyof Users].user_name;
        this.user_name = this.users[key as keyof Users].user_name;
        this.user_image = this.users[key as keyof Users].img;
        this.user_message = "Complete Face Scanning"
        this.roll = this.users[key as keyof Users].roll;
        this.id = key;
        return true;
      }
    }
    return false;
  }

  // after succesfull qr code scanned it will run automatically
  scanSuccessHandler(result: any) {

    // extract useful data from qrcode
    const userData = result[0]["value"] as string;

    // if qrcode shown during face recogination
    if (this.faceRecoginising) {
      this.user_message = "Face Recogination Still Going On"
      this.playUserAnim()
      return
    }

    const temp = '9094CS20';

    // pause the camera
    this.scanner?.pause();

    // chesck in databse for user
    const user_found = this.checkUser(userData);

    // popup data stored when data found/notfound trigger css
    const alerting = document.getElementById("alerting");
    const falerting = document.getElementById("alertingfail");
    var butt = user_found ? document.getElementById("buttonAnim") : document.getElementById("buttonAnim1")

    // if user found succesfuuly
    if (user_found) {
      this.playUserAnim()

      this.faceRecoginising = true
      
// added css to animated userfound
      alerting?.classList.add('showAlert')

      // run specific command/code after givrn time

// setTimeout(() => {
  // your code
// }, time);time in milisecond 1000 ms =1s

      setTimeout(() => {

        alerting?.classList.remove('showAlert')

        this.show_timer = true
        this.scanner?.play()

        setTimeout(() => {
          this.show_timer = false
        }, 3000);
      }, 2000)

      // after 5 second of successfull qr code scanned run this code
      setTimeout(() => {
        try{

          // store all data coming from camera to this variable
        const video = this.scanner?.video.nativeElement;
// send those data to this function for face recoginising
        this.startRecogination(video)
        }catch(e){
          console.log(e)
        }
      }, 5000);

      
    } else {
// show alert if there no user data found
      falerting?.classList.add('showAlert')
      this.user_message = "Error!Try Again"
      this.playUserAnim()

      setTimeout(() => {
        falerting?.classList.remove('showAlert')
        this.user_message = "Scan ID Card"

        this.scanner?.play()
      }, 2000);
    }
  }

  // function for face recogination through camerea
  startRecogination(video: any) {

    this.tries=3

    // setTimeout(() => {
      
    // }, 11000);

    // setInterval(()=>{
    //   // code
    // },1000)

     this.face_scanning_interval = setInterval(async () => {

      if(this.tries==0){
        this.user_message="Not Identified.Reported To Admin"
        this.faceRecoginising=false
        this.playUserAnim()

        // help to stop the interval
        clearInterval(this.face_scanning_interval);
      }

      // face recoginisiting from camer
      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

      if ((detections).length > 0) {
        this.scanner?.stop()

        if ((detections).length > 1) {
          console.log("Multiple Faces Detected")
          this.user_message = "Multiple Face Detected.Try Again"
          this.playUserAnim()
          setTimeout(() => {
            this.scanner?.start()
          }, 3000);

        } else {
          this.user_message = "Comparing Faces"
          this.playUserAnim()
          this.compareFaces(this.user_image, detections);
        }
      }
    }, 1000);

  }


  async compareFaces(user_image: string, faceImage2: any) {

    const image1 = await faceapi.fetchImage(user_image);
    // Detect faces and extract descriptors
    const descriptors1 = await faceapi.detectAllFaces(image1).withFaceLandmarks().withFaceDescriptors();
    // Check if at least one face is detected in each image
    if (descriptors1.length > 0 && faceImage2.length > 0) {
      // Calculate the distance between the face descriptors
      const compared_data = faceapi.euclideanDistance(descriptors1[0].descriptor, faceImage2[0].descriptor);

      // Compare the distance and set a threshold for similarity
      const similarityThreshold = 0.6;
      if (compared_data < similarityThreshold) {
        this.faceRecoginising = false
        this.user_message = "Faces Are Similar"

        this.playUserAnim()
        clearInterval(this.face_scanning_interval);
        this.flip_card=true

      this.faceRecoginationSuccess() 
  
      // // 
        setTimeout(() => {

          this.flip_card = false
          this.user_name="Message"
          this.user_message="Scan You ID Card"
          this.user_image="assets/needs/frame.png"
          this.scanner?.start()
        }, 3000);
      } else {
        console.log('Faces are different.It Will Get Reported');
        this.user_message = "Face Not Matched.Try Again"
        this.tries =this.tries-1
        this.playUserAnim()
        setTimeout(() => {
          this.scanner?.start()
        }, 3000);
      
      }
    } else {
      console.log('No faces detected in one or both images');
      this.message = "Error On Comparing.Contact Admin"
      this.playUserAnim()

      return
    }
  }

  faceRecoginationSuccess(){
    console.log("ASdf")
  }

  playUserAnim() {
    this.usermsg.nativeElement.classList.add('blink');

    setTimeout(() => {
      this.usermsg.nativeElement.classList.remove('blink');
    }, 2000);
  }
}



interface User {
  user_name: string;
  roll: number;
  stream: string;
  img: string;
}

interface Users {
  [key: string]: User;
}
