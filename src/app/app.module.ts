import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TimersComponent } from './components/timer/timers/timers.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
