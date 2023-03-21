import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { signUp } from 'src/app/interface/user.model';
import { ApiService } from '../api/api.service';
import { LocalstorageService } from '../storage/localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public api:ApiService, private storage:LocalstorageService,public router: Router) {

   }

   login(data:any){
    return this.api.post('user/login',data);
   }

   async getToken(){
    return await this.storage.getStorage('token')
   }

   isLoggedIn(){
    return from(this.getToken());
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
      this.storage.clearStorage();
      this.router.navigateByUrl('user/signup');
   }
}
