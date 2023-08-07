import { Component,ChangeDetectorRef, ElementRef, OnInit, Renderer2, NgZone} from '@angular/core';
import { AttendenceService } from '../services/attendence.service';
import { HttpClient } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'
  ]
})
export class TeacherComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef,private ngZone: NgZone,private el: ElementRef, private renderer: Renderer2, private AttendenceService: AttendenceService, private http: HttpClient) { }

  // basic variables [] represent empty list/array.... any defines data type
  attendence_data: any[] | undefined;
  retreivedData:any[] = [];

  // load attendence data
  async loadAttendence(month: any):Promise<void> {

    try {
      //gett the data of specific month
      this.AttendenceService.getAllAttendence(month).subscribe((data) => {
        this.attendence_data = data;
      });

      // access calender from html
      const calendarEl = this.el.nativeElement.querySelector('#calendar');
      calendarEl.style.opacity = 0.2;

      setTimeout(() => {
        this.addToCalender()    
        calendarEl.style.opacity = 1;
      }, 2000);
      
    } catch (e) {
      alert(e)
    }
}

// 
checkData(data:any){
  if(this.retreivedData.length>0){
    for(let i=0;i<this.retreivedData.length;i++)
        if(this.retreivedData[i]==data)
              return true
  }
  return false
}


  async ngOnInit() {
    await this.loadAttendence("1")
    $('#calendar').evoCalendar({
      theme: 'Midnight Blue',
    })
    $('#calendar').evoCalendar('toggleSidebar', false);
    $('#calendar').evoCalendar('selectMonth', 5);
    this.onMonthChange()
  }
  // test
  onMonthChange(){
    $('#calendar').on('selectMonth', (event:any, activeMonth:any, monthIndex:any) => {
      this.ngZone.run(() => {
        console.log("Asdf", event, activeMonth, monthIndex + 1);
        if(this.checkData(monthIndex+1)){
          return
        }
        this.loadAttendence(`${monthIndex+1}`)
      });
    });
  }

  // add datas to calender
  addToCalender() {

    // its to check wheather if data is already on calendar
    let monthId = this.attendence_data!["id" as any];
    if(this.checkData(monthId)){
      return
    }
    this.retreivedData.push(monthId)
    
    let monthData = this.attendence_data![monthId];
    const calendarEl = this.el.nativeElement.querySelector('#calendar');
    const calendar = $(calendarEl);

    for (let i in monthData) {
      let day = parseInt(i) + 1;
      let total = 56;
      if (monthData[i] == false) {
        calendar.evoCalendar("addCalendarEvent",
          {
            id: `kuchbhi`,
            name: `No Class`,
            date: `${monthId}/${day}/2023`, 
            type: "holiday",
            description: `No Class Has Taken On This Day`
          },
        );

      } else {

        calendar.evoCalendar("addCalendarEvent", [
          {
            id: `kuchbhi`,
            name: `Total Student: (${total})`,
            date: `${monthId}/${day}/2023`,
            type: "birthday",
            color: "blue",
            description: `Total-Absents: ${monthData[i].length}`
          },
          {
            id: `kuchbhi`,
            name: `Attendence Date(08/${i + 1})`,
            date: `${monthId}/${day}/2023`,
            type: "event",
            color: "green",
            description: `Absent Roll-No: ${monthData[i]}`
          },

        ])
      }
      this.cdRef.detectChanges();
    }

    
  }
}


