import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  protected apiServer = environment.API_URL;

  constructor(private httpService: HttpClient) { }

  public getCurrentLocation(): Observable<any> {
    return this.httpService.get(this.apiServer + '/Location');
  }

  public setCurrentLocation(lat: Number, lon: Number): Observable<any> {
    return this.httpService.post<any>(this.apiServer + '/Location?lat=' + lat + '&lon=' + lon,{});
  }
}
