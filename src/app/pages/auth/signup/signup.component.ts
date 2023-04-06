import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { OtpSixDigitComponent } from 'src/app/components/otp/otp.component';
import { LocalstorageService } from 'src/app/services/storage/localstorage.service';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  showPassword: boolean = false;
  
  form = this.fb.group({
    username:[ '',
    {
      validators:[Validators.required]
    }],
    email:['',
    {
      validators:[Validators.required,Validators.email],
      updateOn:'blur'
    }],
    password:['',[Validators.required,Validators.minLength(8),
      createPasswordStrengthValidator()]]
  });

  constructor(
    private fb:NonNullableFormBuilder,
    public authService: AuthService,
    public globalSnakbar:GlobalService,
    private matDialog: MatDialog,
    private storage:LocalstorageService,
    private router:Router,
  ){

  }
  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.form.valid) return
    let data = this.form.value;
    if(this.form.valid){
      this.authService.register(data).subscribe(res => {
         if(res.status === HttpStatusCode.OK){
           this.authService.updateToken(res?.data?.token)
            // this.globalSnakbar.successSnakBar(res.message);
            this.globalSnakbar.successSnakBar(`OTP sent to your ${res.data.email}`);
            this.emailVerification(res.data.email);
            this.storage.setStorage('id', res?.data?._id);
            this.storage.setStorage('token', res?.data?.token);
            this.storage.setStorage('email', res?.data?.email);
            this.storage.setStorage('email_verify', res?.data?.email_verify);
            this.storage.setStorage('userName', res?.data?.userName);
         }
      })
    }
  };

  public emailVerification(email:string){
    let verifyEmail = {
       email,
       verifyEmail:true
    };
    
    this.matDialog.open(OtpSixDigitComponent, {
      panelClass:['otp-mat-dialog'],
      width:'600px',
      data:verifyEmail,
      disableClose:true,
    }).afterClosed()
    .pipe()
    .subscribe();
  };

  get email() {
    return this.form.controls['email'];
  }

  get password() {
      return this.form.controls['password'];
  }

  get name(){
    return this.form.controls['username'];
  }
}
