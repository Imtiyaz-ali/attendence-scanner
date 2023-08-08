import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeacherAppService } from '../services/teacher.service';
import { StudentAppService } from '../services/student.service';
import { AttendenceService } from '../services/attendence.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private cdRef: ChangeDetectorRef, private TeacherAppService: TeacherAppService, private AttendenceService: AttendenceService, private StudentAppService: StudentAppService, private http: HttpClient, private formBuilder: FormBuilder) { }
  @ViewChild('edits') edit!: ElementRef;

  // stores
  students: any[] | undefined;
  teachers: any[] | undefined;
  currentTeacher: any[] | undefined;
  attendence_data: any[] | undefined;


  // variables
  tempName = "";
  tempSubject = ""
  tempId = ""
  tempProfile = ""
  // 
  signupForm = new FormGroup({
    name: new FormControl('', []),
    id: new FormControl('', []),
    subject: new FormControl('', [])
  })

  ngOnInit(): void {
    // /admin 
    this.loadStudent()
    this.loadTeacher()
  
  }
  // all student operations
  async loadStudent() {
    this.StudentAppService.getAllStudent().subscribe((data) => {
      this.students = data;
    });
  }


  // all teacher operations
  async loadTeacher() {
    this.TeacherAppService.getAllTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }

  // other same operation
  async editDatas(id: any, teacher: boolean = true) {

    document.getElementById("edits")?.classList.add('showEdit')
    if (teacher) {
      let a = this.TeacherAppService.getTeacherById(id);
      a.forEach(element => {
        // this.currentTeacher[] = element
      });
      console.log(this.currentTeacher)
    }
  }

  updateData() {
    const c = this.signupForm.value.name
    console.log(c)

    let a = {
      "id": this.signupForm.value.id,
      "user_name": this.signupForm.value.name,
      "subject": this.signupForm.value.subject,
      "stream": "CS",
      "img_data": this.tempSubject
    }
    console.log(a)
    this.TeacherAppService.updateTeacher(this.signupForm.value.id!, a).subscribe((response) => {
      alert("Data Has CHanged")
      document.getElementById("edits")?.classList.remove('showEdit')

    });
    this.cdRef.detectChanges();
  }

}

