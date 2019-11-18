import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  protected apiServer = environment.API_URL;
  
  constructor(private httpService: HttpClient) {

  }

  public getCurrentWeather(lat: number, lng: number): Observable<any> {
    return this.httpService.get(this.apiServer + '/weather/currentweather?lat=' + lat  + '&lon=' + lng);
  }
}
