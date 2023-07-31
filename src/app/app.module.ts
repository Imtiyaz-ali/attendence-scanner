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


// import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    TeacherComponent,
    TimersComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxScannerQrcodeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
