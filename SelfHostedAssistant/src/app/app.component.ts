import { Component, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit{
 
  configLoaded = true;
  title = 'SelHostedAssistant';
  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin,rrulePlugin  ]; // important!
  events = [];
  lat: number;
  lng: number;
  forecast: Observable<any>;
  defaultConfigurations: any;

  constructor(protected eventService: EventService,private weatherService: WeatherService, private spinner: NgxSpinnerService, private calendarUpload : CalendarImportService) {
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
  }

  ngOnInit(){
    this.eventService.getEvents().subscribe(data => {
      this.events = this.events.concat(data);
      var calendarEl = document.getElementById('full-calendar');
      this.defaultConfigurations = {
        themeSystem: 'standard',
        editable: true,
        header: {
          left:   'title',
          center: 'addEventButton',
          right:  'today prev,next'
        },
        slotDuration: moment.duration('00:15:00'),
        slotLabelInterval: moment.duration('01:00:00'),
        deepChangeDetection: true,
        navLinks: true,
        navLinkDayClick: function(date, jsEvent) {
        console.log('day', date.toISOString());
        console.log('coords', jsEvent.pageX, jsEvent.pageY);
        },
        dayClick: (date, jsEvent, activeView) => {
          alert('day clicked')
        },
        plugins: this.calendarPlugins,
        customButtons: {
          addEventButton:{
            text: '+',
            click: function(){
              alert('add event')
            }
          }
        },
        viewType:"dayGridMonth",
        eventRender: function(info) {
          console.log(info)
        },
        events : this.events
      };    
      let newCalendar = new Calendar(calendarEl,this.defaultConfigurations);
      newCalendar.render();
    
    }, error => console.log(error));
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

}
