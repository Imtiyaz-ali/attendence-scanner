import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { AttendanceService } from './data.service';
declare var $: any;
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'
  ]
})
export class TeacherComponent implements OnInit {


  attendanceData!: any[];
  constructor(private el: ElementRef, private renderer: Renderer2,private attendanceService: AttendanceService) { }
  loadingData: any;

  async loadData(): Promise<void> {
    try {
      this.loadingData = true;
      const data = await this.attendanceService.getAttendanceData().toPromise();
      this.attendanceData = data;
      console.log(data);
      console.log(this.attendanceData[0]);
    this.getCalender()

    } catch (error) {
      console.error(error);
    } finally {
      this.loadingData = false;
    }
  }

  getCalender(){

    // attendence

    // Using forEach method
    if (this.attendanceData) {
      this.attendanceData.forEach((attendance) => {
        if (attendance.class == true) {
          const total = 56
          const present = attendance.absent - total

          $("#calendar").evoCalendar("addCalendarEvent", [
            {
              id: attendance.date,
              name: `Attendence(${attendance.date})`,
              date: `${attendance.date}/2023`, 
              type: "event",
              // everyYear: true,
              color: "green",
              description: `Total-Absents: ${attendance.absent}`
            },
            {
              id:`Absent ${attendance.date}`,
              name: "Absentees Roll-No",
              date: `${attendance.date}/2023`, 
              type: "event",
              // everyYear: true,
              color: "red",
              description: `${attendance.rollNo}`
            },
            {
              id:`Leave ${attendance.leave}`,
              name: "On-Leave Roll-No",
              date: `${attendance.date}/2023`, 
              type: "event",
              // everyYear: true,
              color: "blue",
              description: `${attendance.leave}`
            }

          ]);
        } else {
          $("#calendar").evoCalendar("addCalendarEvent", [
            {
              id: attendance.date,
              name: `No Class`,
              date: `${attendance.date}/2023`, // Repeat every 7 days
              type: "holiday",
              // everyYear: true,
              // color: "pink",
              description: `No Class Has Taken On This Day`
            },

          ]);
        }
      });
    }

  

  }


  ngOnInit(): void {
    this.loadData()
    $('#calendar').evoCalendar({
      theme: 'Midnight Blue',
      // eventListNoEventsText: "No Class Taken On This Day." 
    })
    $('#calendar').evoCalendar('toggleSidebar', false);
    this.getCalender()
    
    setTimeout(() => {

      $("#calendar").evoCalendar("addCalendarEvent", [
        {
          id: "123",
          name: "dxfg",
          date: `04/04/2023`, // Repeat every 7 days
          type: "event",
          // everyYear: true,
          color: "green",
          description: `Total-Absents:`
        }])
      
    }, 3000);
    
  }

  addEvent() {
    const event = {
      id: '345345',
      name: '345',
      date: '04/04/2023',
      type: 'event',
      color: 'green',
      description: 'Total-Absents:'
    };
    const calendarEl = this.el.nativeElement.querySelector('#calendar');
    const calendar = $(calendarEl);
    calendar.evoCalendar('addCalendarEvent', [event]);
  }
  
}
