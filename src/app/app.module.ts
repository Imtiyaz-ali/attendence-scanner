// all modules to run our projects

// basic module to run angular in browser
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// module to sc an qr-code
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

// module to access database
import { HttpClientModule } from '@angular/common/http';

// helps to navigate across different page in browser
// /admin /home /teacher /student
import { AppRoutingModule } from './app-routing.module';

// used to validate user input and form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// all components
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TimersComponent } from './components/timer/timers/timers.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';


@NgModule({
  declarations: [
    // used to import all pages for uses
    // #include<stdio.h>
    AppComponent,
    CameraComponent,
    TeacherComponent,
    TimersComponent,
    AdminComponent,
    StudentComponent,
  ],
  imports: [
    // import modules for #include<stdio.h>
    BrowserModule,
    AppRoutingModule,
    NgxScannerQrcodeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
