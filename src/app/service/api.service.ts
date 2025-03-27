import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  /*
   *  api requests given an endpoint, used for any api url and supabase requests handled in server.ts
   */ 

  getRequest(endpoint: string): Observable<any> {
    return this.http.get<any>(endpoint);
  }

  postRequest(endpoint: string, payload: any): Observable<any> {
    console.log('SERVICE: in api servier, posting to api:', endpoint, payload);
    return this.http.post<any>(endpoint, payload);
  }
}
