import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public getEvents(): Observable<Event[]> {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    let data: any = [
        { id: 1, title: 'event 1', start: '2019-10-31' , end: '2019-11-02'},
        { id : 2, title: 'event 2', start: '2019-11-04' , end: '2019-11-02' }
      ];
    return of(data);
  }
}
