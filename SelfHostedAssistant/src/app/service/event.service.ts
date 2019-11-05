import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../model/event';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  protected apiServer = AppConfigService.settings.apiServer;

  constructor(private httpService: HttpClient) {

  }
  public getEvents(): Observable<Event[]> {
    return this.httpService.get<Event[]>(this.apiServer + '/event');
  }
}
