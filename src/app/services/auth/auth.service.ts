import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUp } from 'src/app/interface/user.model';
import { ApiService } from '../api/api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api:ApiService) {

   }

   login(){

   }

   register(data:any){
    return this.api.post('user/signup',data);
   }

   resetPassword(){

   }

   resendEmailVerification(data:string){
    return this.api.get('user/send/verification-email',data);
   }

   logout(){
    
   }
}
