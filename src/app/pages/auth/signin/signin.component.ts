import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LocalstorageService } from 'src/app/services/storage/localstorage.service';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  showPassword: boolean = false;

  form = this.fb.group({
    email:['',
    {
      validators:[Validators.required,Validators.email],
      updateOn:'blur'
    }],
    password: ['', [Validators.required, Validators.minLength(8),
      createPasswordStrengthValidator()]]
  });

  constructor(
    private fb:NonNullableFormBuilder,
    public authService: AuthService,
    public globalSnakbar:GlobalService,
    public storage:LocalstorageService,
    public router:Router,
  ){
    
  }

  onSubmit(){
    if(!this.form.valid) return
    let data = this.form.value
    this.authService.login(data).subscribe((res:any) => {
      console.log(res)
        if(res.status === HttpStatusCode.OK){
          this.globalSnakbar.successSnakBar('Successfully login');
          this.storage.setStorage('token', res?.data?.token);
          this.storage.setStorage('email', res?.data?.email);
          this.storage.setStorage('emailVerified', res?.data?.emailVerified);
          this.router.navigate(['/home'])
        }else{
            console.log(res.error)
            this.globalSnakbar.errorSnakBar(res?.error?.message);
        }
      }
    )
  };

  get email() {
    return this.form.controls['email'];
  }

  get password() {
      return this.form.controls['password'];
  }

}
