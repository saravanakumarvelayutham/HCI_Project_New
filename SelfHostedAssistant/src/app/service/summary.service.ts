import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  protected apiServer = environment.API_URL;

  constructor(private httpService: HttpClient) { }

  public getSummary(): Observable<any> {
    return this.httpService.get(this.apiServer + '/Summary');
  }
}
