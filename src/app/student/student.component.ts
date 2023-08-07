import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AttendenceService } from '../services/attendence.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentAppService } from '../services/student.service';

declare var $: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

// 
  attendence: any | undefined;
  selectedMonth: any;
  months: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  attendence_data: any[] | undefined;
  showData = false

  // 
  students: any[] = [];
  selectedStudent: any | undefined;
  student_id  = ''
  student_roll:any;
  student_name= ''
  currentStudent :any;

  searchingDatabase = false

  constructor(private http: HttpClient, private AttendenceService: AttendenceService, private StudentAppService: StudentAppService) { }
  // 
  idForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
  })
  // run codes automatically inside if page visited
  ngOnInit(): void {

    this.loadStudents();
    this.loadAttendence('1')
  }

  async changeMonth(a: any) {
    await this.loadAttendence(a + 1)
  }

  fetchData() {
    if(this.idForm.invalid){
      alert("No-Id is Provided")
    }
    this.searchingDatabase = true
    let found = false
    this.students.forEach(e => {
      if(e.id== this.idForm.value.id){
        this.currentStudent = e
        this.student_name = e.user_name
        this.student_roll = e.roll.toString();
        this.student_id = e.id
        found =true
        return
      }
    });

    setTimeout(() => {
      if(found){
        this.searchingDatabase = false
        this.showData = true
      }else{
        this.searchingDatabase = false
        alert("Student ID Not Found In DataBase")
      }
    }, 1000);
  }

  // help to load student data from student databse to local variable
  loadStudents(): void {
    this.http.get<any>('http://localhost:3000/studentsData').subscribe((data) => {
      this.students = Object.values(data);
    });
  }

  async loadAttendence(month: string): Promise<void> {

    this.AttendenceService.getAllAttendence(month).subscribe((data) => {
      let idd = data
      this.selectedMonth = month
      this.attendence_data = idd[month];
    })
  };

}

