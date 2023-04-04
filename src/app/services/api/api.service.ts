import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiEndPoint = environment
  constructor(public http:HttpClient,) { }

  get(url:any): Observable<any>{
    return this.http.get<any>(this.apiEndPoint.serverBaseUrl + url)
  };

  post(url:any, data:any): Observable<any>{
    return this.http.post<any>(this.apiEndPoint.serverBaseUrl + url, data)
  };

  patch(url:any, data:any): Observable<any>{
    return this.http.patch<any>(this.apiEndPoint.serverBaseUrl + url, data)
  };
  put(url:any, data:any): Observable<any>{
    return this.http.put<any>(this.apiEndPoint.serverBaseUrl + url, data)
  };
  delete(url:any): Observable<any>{
    return this.http.delete<any>(this.apiEndPoint.serverBaseUrl + url)
  };
  
}
