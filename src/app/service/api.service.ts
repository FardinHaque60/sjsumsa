import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getRegRequest(endpoint: string): Observable<any> {
    return this.http.get<any>(endpoint);
  }

  postRegRequest(endpoint: string, payload: any): Observable<any> {
    return this.http.post<any>(endpoint, payload);
  }

  getPrayerTimes(): Observable<any> {
    return this.http.get('api/getPrayerTimes');
  }

  postPrayerTimes(payload: any): Observable<any> {
    return this.http.post('api/postPrayerTimes', payload);
  }
}
