import { Component, OnInit } from '@angular/core';
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
export class SigninComponent implements OnInit{

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

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.form.valid) return

    if(this.form.valid){
      let data = this.form.value
      this.authService.login(data).subscribe((res:any) => {
          if(res.status === HttpStatusCode.OK){
            this.authService.updateToken(res?.data?.token)
            this.storage.setStorage('id', res?.data?._id);
            this.storage.setStorage('token', res?.data?.token);
            this.storage.setStorage('email', res?.data?.email);
            this.storage.setStorage('userName', res?.data?.userName);
            this.router.navigateByUrl('/home')
            this.globalSnakbar.successSnakBar('Successfully login');
          }else{
              this.globalSnakbar.errorSnakBar(res?.error?.message);
          }
        }
      )
    }
  };

  get email() {
    return this.form.controls['email'];
  }

  get password() {
      return this.form.controls['password'];
  }

}
