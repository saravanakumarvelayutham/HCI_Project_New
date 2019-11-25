import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from './model/event';
import { EventService } from './service/event.service';
import { Calendar } from '@fullcalendar/core';
import { WeatherService } from './service/weather.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CalendarImportService } from './service/calendar-import.service';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import rrulePlugin from '@fullcalendar/rrule';
import { MatDialog } from '@angular/material';
import { AddeventdialogComponent } from './addeventdialog/addeventdialog.component';
import { FullCalendarComponent } from '@fullcalendar/angular';

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

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
    console.log('after view')
    this.setCalendarOptions()
  }
 
  configLoaded = true;
  title = 'SelHostedAssistant';
  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin,rrulePlugin  ]; // important!
  events :Event[] = [];
  lat: number;
  lng: number;
  forecast: Observable<any>;
  defaultConfigurations: any;
  @ViewChild(FullCalendarComponent, {static : false}) calendarComponent;
  calendarApi : Calendar;

  constructor(protected eventService: EventService,private weatherService: WeatherService, private spinner: NgxSpinnerService, private calendarUpload : CalendarImportService,
    public  dialog: MatDialog) {
    //eventService.addEvent().subscribe();
    if (navigator)
    {
      this.spinner.show();
      navigator.geolocation.getCurrentPosition( pos => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;
          this.weatherService.getCurrentWeather(this.lat,this.lng).subscribe(weatherData => {
            this.forecast = weatherData;
            this.spinner.hide();
          });
        });
    }   
    this.eventService.getEvents().subscribe(eventResults =>{
      this.events = eventResults;
    });
    console.log('constructor')
  }

  ngOnInit(){    
  }

  weatherIcon(icon) {
    switch (icon) {
      case 'partly-cloudy-day':
        return 'wi wi-day-cloudy'
      case 'clear-day':
        return 'wi wi-day-sunny'
      case 'partly-cloudy-night':
        return 'wi wi-night-partly-cloudy'
      default:
        return `wi wi-day-sunny`
    }
  }

  setCalendarOptions() {
    const dialog = this.dialog;
    this.calendarApi.setOption('header', {
             left:   'title',
             right:  'addEventButton today prev,next'
           });
    this.calendarApi.setOption('customButtons', {
      'addEventButton' : {
        'text' : '+',
        'click' : function() {
          const dialogRef = dialog.open(AddeventdialogComponent, {
            width: '500px',
            data: {events: this.events},
            disableClose : true
          });
        }
      }
    })
  }

}
