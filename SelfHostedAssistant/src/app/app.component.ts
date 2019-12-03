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
import { LocationService } from './service/location.service';
import { SummaryService } from './service/summary.service';
import RRule, { rrulestr } from 'rrule';

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
  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin,rrulePlugin  ]; // important!
  events :Event[] = [];
  forecast: Observable<any>;
  defaultConfigurations: any;
  @ViewChild('calendar', {static : false}) calendarComponent;
  @ViewChild('daycalendar', {static : false}) daycalendarComponent;
  calendarApi : Calendar;
  daycalendarApi : Calendar;
  lat: number;
  lon: number;
  nextEvent;

  constructor(protected eventService: EventService,private weatherService: WeatherService, private spinner: NgxSpinnerService, private calendarUpload : CalendarImportService,
    public  dialog: MatDialog,private locationService:LocationService, private summaryService: SummaryService) {

  }

  ngOnInit(){    
    this.locationService.getCurrentLocation().subscribe(result => {
      if(result.latitude != null && result.longitude != null) {
        this.lat = result.latitude;
        this.lon = result.longitude;
        this.spinner.show();  
        this.weatherService.getCurrentWeather(this.lat,this.lon).subscribe(weatherData => {
          this.forecast = weatherData;
          console.log(weatherData)
          this.summaryService.getSummary().subscribe(summaryResult => {
            this.nextEvent = summaryResult
          });
          this.spinner.hide();
        });  
      }
       else 
        {
          if (navigator)
          {
            this.spinner.show();      
            navigator.geolocation.getCurrentPosition( pos => {
                this.lon = +pos.coords.longitude;
                this.lat = +pos.coords.latitude;
                this.locationService.setCurrentLocation(this.lat,this.lon).subscribe(()=> {});
                this.weatherService.getCurrentWeather(this.lat,this.lon).subscribe(weatherData => {
                  this.forecast = weatherData;
                  console.log(weatherData)
                  this.summaryService.getSummary().subscribe(summaryResult => {
                    console.log(summaryResult)
                    this.nextEvent = summaryResult
                  });
                  this.spinner.hide();
                });
              });
          }
        }   
    });
    this.refreshEvents(this.eventService,this)        
  }

  
  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
    this.daycalendarApi = this.daycalendarComponent.getApi();
    this.setCalendarOptions();
    this.daycalendarApi.changeView('timeGridDay');
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

    let dialog = this.dialog;
    let dialogRef;
    let angularComponent = this;
    let events = this.events;
    let eventRefresh = this.refreshEvents;
    let eventService = this.eventService;
    this.calendarApi.setOption('header', {
             left:   'title',
             right:  'addEventButton today prev,next'
           });
    this.daycalendarApi.setOption('header', {
      left:   '',
      right:  ''
    });
    this.calendarApi.setOption('timeZone','local');
    this.daycalendarApi.setOption('timeZone','local');
    this.daycalendarApi.setOption('nowIndicator',true)
    this.daycalendarApi.setOption('scrollTime',new Date().toLocaleTimeString())
    this.calendarApi.setOption('customButtons', {
      'addEventButton' : {
        'text' : '+',
        'click' : function() {
          dialogRef = dialog.open(AddeventdialogComponent, {
            width: '500px',
            data: {events: events},
            disableClose : true
          });
          dialogRef.afterClosed().subscribe(result => {
            eventRefresh(eventService,angularComponent)
          });
        }
      }
    })
    
  }

  refreshEvents(eventService,angularComponent) {
    eventService.getEvents().subscribe(eventResults =>{
      angularComponent.events = eventResults
    })
  }

}
