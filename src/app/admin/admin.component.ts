import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  studentStore: undefined;
  teacherStore: Teachers | undefined;
  constructor(private http: HttpClient) { }

  @ViewChild('edits') edit!: ElementRef;


// variables
  tempName="";
  tempSubject=""
  tempId=""
  tempProfile=""
  // 


   ngOnInit(): void {
    this.loadStudent()
    this.loadTeacher()
  }

  async loadStudent(){
    this.http.get<any>('assets/database/student.json').subscribe((data) => {
      this.studentStore = data;
      
    });
  }

  async loadTeacher(){
    this.http.get<any>('assets/database/teacher.json').subscribe((data) => {
      this.teacherStore = data;

    });
  }

  editStudentData(){

  }

  editTeacherData(id:any){
    const edit = document.getElementById("edits");
    edit?.classList.add('showEdit')
    console.log("DFS")
    
  }

  handleError(error:Error){
    alert(error.message)
    return throwError(()=>error)
  }
  getBlogs():Observable<Teachers[]> {
    let a = this.http.get<Teachers[]>('assets/database/teacher.json')
    .pipe(retry(1),catchError(this.handleError))
    let b = a.forEach(element => {
      
      // console.log(element[])1
    });
    this.http.delete<Teachers>('assets/database/teacher.json'+"1234")
    .pipe(retry(1),catchError(this.handleError))
    return a



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
  subject: string;
  stream: string;
  img_data: string;
}
interface Teachers {
  [key: string]: Teacher;
}
