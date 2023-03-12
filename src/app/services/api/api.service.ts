import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiEndPoint = environment

  constructor(public http:HttpClient,) { }

  get(url:any, data?:any){
    return this.http.get<any>(this.apiEndPoint.serverBaseUrl + url, data)
  }

  post(url:any, data:any){
    console.log(data)
    // const body = new HttpParams({fromObject:data})
    return this.http.post<any>(this.apiEndPoint.serverBaseUrl + url, data)
  }
}
