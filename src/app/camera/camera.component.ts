import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import * as faceapi from 'face-api.js';
import { TeacherAppService } from '../services/teacher.service';
import { StudentAppService } from '../services/student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  constructor(private TeacherAppService: TeacherAppService,private StudentAppService:StudentAppService, private http: HttpClient) { }
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
  students: any[] | undefined;
  user_image = "assets/needs/frame.png"
  user_name = "Message"
  user_message = "Scan ID Card Below"

  // face
  face_scanning_interval: any;
  tries: number = 3;

  @ViewChild('action') scanner?: NgxScannerQrcodeComponent;
  @ViewChild('recogination') recogination?: NgxScannerQrcodeComponent;
  @ViewChild('usermsg') usermsg!: ElementRef;

  async ngOnInit() {
    this.user_message = "Model is Loading";
    this.loadStudent()
  }

  async ngAfterViewInit() {
    setTimeout(() => {
      // this.loadModels();
      this.user_name = "Message"
      this.user_message = "Scan Your ID Card"
      this.show_timer = false
      this.playUserAnim()
    }, 3000);
    // this.scanner?.start()
  }
  ngOnDestroy() {
    if (this.scanner?.isStart) {
      this.scanner?.stop();
      this.modelloading = true;
      this.cameraloading = true;
    }
  }
  // custom load face recoginisation model in the page
  loadModels() {
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

  // load students
  async loadStudent() {
    this.StudentAppService.getAllStudent().subscribe((data) => {
      this.students = data;
    });
  }

  // check if student present in database or not
  checkUser(key: any) {

    for (let keys in this.students) {
      if (key === this.students?.at(keys as any).id) {
        this.user_name = this.students?.at(key as any).user_name;
        this.user_image = this.students?.at(key as any).img_data;
        this.user_message = "Complete Face Scanning"
        this.roll = this.students?.at(key as any).roll;
        this.id = this.students?.at(key as any).id;
        return true;
      }
    }
    return false;
  }
  scanSuccessHandler(result: any) {

    const userData = result[0]["value"] as string;

    if (this.faceRecoginising) {
      this.user_message = "Face Recogination Still Going On"
      this.playUserAnim()
      return
    }

    const temp = '9094CS20';

    this.scanner?.pause();

    const user_found = this.checkUser(userData);

    const alerting = document.getElementById("alerting");
    const falerting = document.getElementById("alertingfail");
    var butt = user_found ? document.getElementById("buttonAnim") : document.getElementById("buttonAnim1")

    if (user_found) {
      this.playUserAnim()

      this.faceRecoginising = true

      alerting?.classList.add('showAlert')

      setTimeout(() => {

        alerting?.classList.remove('showAlert')

        this.show_timer = true
        this.scanner?.play()

        setTimeout(() => {
          this.show_timer = false
        }, 3000);
      }, 2000)

      setTimeout(() => {
        try {

          const video = this.scanner?.video.nativeElement;
          this.startRecogination(video)
        } catch (e) {
          console.log(e)
        }
      }, 5000);


    } else {

      falerting?.classList.add('showAlert')
      this.user_message = "Error!Try Again"
      this.playUserAnim()

      setTimeout(() => {
        falerting?.classList.remove('showAlert')
        this.user_message = "Scan ID Card"

        this.scanner?.play()
      }, 3000);
    }
  }


  startRecogination(video: any) {
    this.tries = 3
    this.face_scanning_interval = setInterval(async () => {
      if (this.tries == 0) {
        this.user_message = "Not Identified.Reported To Admin"
        this.faceRecoginising = false
        this.playUserAnim()
        clearInterval(this.face_scanning_interval);
      }
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

    const descriptors1 = await faceapi.detectAllFaces(image1).withFaceLandmarks().withFaceDescriptors();

    if (descriptors1.length > 0 && faceImage2.length > 0) {

      const compared_data = faceapi.euclideanDistance(descriptors1[0].descriptor, faceImage2[0].descriptor);

      const similarityThreshold = 0.6;
      if (compared_data < similarityThreshold) {
        this.faceRecoginising = false
        this.user_message = "Faces Are Similar"

        this.playUserAnim()
        clearInterval(this.face_scanning_interval);
        this.flip_card = true

        this.faceRecoginationSuccess()
        
        setTimeout(() => {
          this.flip_card = false
          this.user_name = "Message"
          this.user_message = "Scan You ID Card"
          this.user_image = "assets/needs/frame.png"
          this.scanner?.start()
        }, 3000);
      } else {
        console.log('Faces are different.It Will Get Reported');
        this.user_message = "Face Not Matched.Try Again"
        this.tries = this.tries - 1
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

  faceRecoginationSuccess() {
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

interface students {
  [key: string]: User;
}
