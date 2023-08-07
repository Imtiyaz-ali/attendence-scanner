import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentAppService {
  // string consisit of link of database
  private apiUrl = 'http://localhost:3000'; // Replace with your JSON Server URL

  constructor(private http: HttpClient) { }

  // GET: Get all students
  getAllStudent() {
    return this.http.get<any>(`${this.apiUrl}/studentsData`);
  }
  

  // POST: Add a new student
  addStudent(student: any) {
    return this.http.post<any>(`${this.apiUrl}/studentsData`, student);
  }

  // PUT: Update an existing student by ID (key in this case)
  updateStudent(id: string, studentUpdate: any) {
    return this.http.put<any>(`${this.apiUrl}/studentsData/${id}`, studentUpdate);
  }

  // DELETE: Delete a student by ID (key in this case)
  deleteStudent(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/studentsData/${id}`);
  }
}
