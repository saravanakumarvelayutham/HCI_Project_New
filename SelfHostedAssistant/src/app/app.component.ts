import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from './model/event';
import { EventService } from './service/event.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
 
  configLoaded = true;
  title = 'SelHostedAssistant';
  calendarPlugins = [dayGridPlugin, 'interaction' ]; // important!
  events: Event[];
  @ViewChild('calendar',{static: true}) calendarComponent: FullCalendarComponent;
  calendarApi: Calendar;

  constructor(protected eventService: EventService) {
  }

  ngOnInit(){
    this.eventService.getEvents().subscribe(data => {
        this.events = data;
    });
  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
  }

  eventRender(e) {
    console.log(e);
    
    //e.element.html(html)
  }
}
