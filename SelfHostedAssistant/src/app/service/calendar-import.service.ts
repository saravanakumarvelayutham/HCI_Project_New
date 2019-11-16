import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarImportService {
  protected apiServer = AppConfigService.settings.apiServer;
  config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private httpService: HttpClient) {
  }
  
  public uploadCalendarFile() : Observable<string> {
    return this.httpService.post<string>(this.apiServer + '/CalendarImport',JSON.stringify({'Name': 'test', 'Content':'content goes here'}), this.config);
  }
}
