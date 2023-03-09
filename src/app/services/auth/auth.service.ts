import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUp } from 'src/app/interface/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiEndPoint = environment

  constructor(public http:HttpClient,) {

   }

   login(){

   }

   register(data:any){
    let body = new HttpParams({
      fromObject:data
    })
    console.log(body);
    console.log(this.apiEndPoint)
    return this.http.post<signUp>(`${this.apiEndPoint.serverBaseUrl}user/signup`,body)
   }

   resetPassword(){

   }

   logout(){
    
   }
}
