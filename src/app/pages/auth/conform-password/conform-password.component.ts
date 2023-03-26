import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength';

@Component({
  selector: 'app-conform-password',
  templateUrl: './conform-password.component.html',
  styleUrls: ['./conform-password.component.scss']
})
export class ConformPassword {

  showPassword: boolean = false;
  
  form = this.fb.group({
    password:['',[Validators.required,Validators.minLength(8),createPasswordStrengthValidator()]]
  });

  constructor(
    private fb:NonNullableFormBuilder,
    private router:Router,
    private authService:AuthService,
    public globalService:GlobalService,
  ){

  
  }


  onSubmit(){
     if(!this.form.valid) return;

     if(this.form.valid){
        let email = localStorage.getItem('email');
        let data = {
          email,
          password:this.form.value.password
        };
        this.authService.resetPassword(data).subscribe(res => {
            if(res.status === HttpStatusCode.OK){
                this.globalService.successSnakBar(res.message);
                this.router.navigateByUrl('/signin');
            }
        });
     }

     

  }

  get password() {
    return this.form.controls['password'];
  }  

}
