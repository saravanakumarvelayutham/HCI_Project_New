import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from './model/event';
import { EventService } from './service/event.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import { WeatherService } from './service/weather.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

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
  lat: number;
  lng: number;
  forecast: Observable<any>;

  constructor(protected eventService: EventService,private weatherService: WeatherService, private spinner: NgxSpinnerService) {
    if (navigator)
    {
      this.spinner.show();
      navigator.geolocation.getCurrentPosition( pos => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;
          this.weatherService.getCurrentWeather(this.lat,this.lng).subscribe(weatherData => {
            this.forecast = weatherData;
            console.log(this.forecast);
            this.spinner.hide();
          });
        });
    }
  }

  ngOnInit(){
    this.eventService.getEvents().subscribe(data => {
        this.events = data;
    });
  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
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

  eventRender(e) {
    console.log(e);
    
    //e.element.html(html)
  }
}
