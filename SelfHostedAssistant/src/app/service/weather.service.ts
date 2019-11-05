import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  protected apiServer = AppConfigService.settings.apiServer;
  
  constructor(private httpService: HttpClient) {

  }

  public getCurrentWeather(lat: number, lng: number): Observable<any> {
    return this.httpService.get(this.apiServer + '/weather/currentweather?lat=' + lat  + '&lon=' + lng);
  }
}
