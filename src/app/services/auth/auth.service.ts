import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { signUp } from 'src/app/interface/user.model';
import { ApiService } from '../api/api.service';
import { LocalstorageService } from '../storage/localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _token$ = new BehaviorSubject<string>(null!);

  get token(){
    return this._token$.asObservable();
  }

  constructor(public api:ApiService, private storage:LocalstorageService,public router: Router) {

   }

   login(data:any){
    return this.api.post('user/login',data);
   };

   async getToken(){
    return await this.storage.getStorage('token')
   };

   updateToken(value:any){
      this._token$.next(value);
   };

   isLoggedIn(){
     return this._token$.value;
   };

   register(data:any){
     return this.api.post('user/signup',data);
   };

   resetPasswordOtp(data:any){
     return this.api.post('user/send/reset/passwordotp',data);
   };

   resendOtp(data?:any){
    return this.api.get('user/send/verification-email',data);
   };

   resendResetPasswordOtp(data:any){
    return this.api.get('user/send/resetpassword/verification-email',data);
   }


   resetPassword(data:any){
    return this.api.patch('user/reset/password',data);
   }

   verifyOtp(data:any){
    return this.api.patch('user/verify/emailotp',data);
   }
   verifyResetPasswordOtp(data:any){
    return this.api.post('user/verify/resetpassword',data);
   }

   logout(){
      this.storage.clearStorage();
      this.router.navigate(['/signup']);
   };
}
