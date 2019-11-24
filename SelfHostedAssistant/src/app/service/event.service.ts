import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../model/event';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RRule } from "rrule";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  protected apiServer = environment.API_URL;
  config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      

  constructor(private httpService: HttpClient) {

  }
  public getEvents() : Observable<any[]> {
    return this.httpService.get<Event[]>(this.apiServer + '/event');
  }

  public addEvent(event:Event) {
    return this.httpService.post<Event>(this.apiServer + '/event',event,this.config);
  }
}
