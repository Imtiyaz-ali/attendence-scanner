import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  private apiUrl = 'http://localhost:3000'; // Replace with your JSON Server URL

  constructor(private http: HttpClient) { }

  // GET: Get all teachers
  getAllAttendence(month:any) {
    return this.http.get<any>(`${this.apiUrl}/students/${month}`).pipe(retry(1),catchError(this.handleError))
  }
  

//   // POST: Add a new teacher
//   addTeacher(teacher: any) {
//     return this.http.post<any>(`${this.apiUrl}/teachers`, teacher);
//   }

//   // PUT: Update an existing teacher by ID (key in this case)
//   updateTeacher(id: string, updatedTeacher: any | undefined) {
//     return this.http.put<any>(`${this.apiUrl}/teachers/${id}`, updatedTeacher).pipe(retry(1),catchError(this.handleError))
//   }

//   // DELETE: Delete a teacher by ID (key in this case)
//   deleteTeacher(id: string) {
//     return this.http.delete<any>(`${this.apiUrl}/teachers/${id}`);
//   }

//   getTeacherById(id: number) {
//     return this.http.get<any>(`${this.apiUrl}/teachers/${id}`);
//   }

  // others
  handleError(error:Error){
    alert(error.message)
    return throwError(()=>error)
  }
}
