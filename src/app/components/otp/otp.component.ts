import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { map } from 'rxjs';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LocalstorageService } from 'src/app/services/storage/localstorage.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpSixDigitComponent implements OnInit {

  @ViewChild('ngxotp') ngxOtp!: NgxOtpInputComponent;
  getResendOtp:any;


  form = this.fb.group({
    todo:[ '',[Validators.required]],
  });

  constructor(
    private fb:NonNullableFormBuilder,
    public dialogRef: MatDialogRef<OtpSixDigitComponent>,
    public router:Router,
    public globalService:GlobalService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private authService:AuthService,
    private localStorage:LocalstorageService
    ){
      
    }

    ngOnInit(): void { }

  otpInputConfig:NgxOtpInputConfig  = {
    otpLength:6,
    autofocus:true,
    autoblur:true,
    numericInputMode:true,
    classList:{
      inputBox:'my-super-box-class',
      input:'my-super-class',
      inputFilled:'my-super-filled-class',
      inputDisabled:'my-super-disable-class',
      inputError:'my-super-error-class',
      inputSuccess:'my-super-success-class', 
    }
  };

  handleOtpChange(value:string[]):void {
  };
  
  handleFillEvent(value:string):void { 
    if(this.data?.verifyEmail){
      if(value){
        this.authService.verifyOtp({ verification_token:value }).subscribe(res => {
          if(res?.status == HttpStatusCode.OK){
            this.localStorage.setStorage('email_verify',res.data)
            this.globalService.successSnakBar(res.message);
            this.router.navigate(['/home']);
            this.dialogRef.close();
          }
        });
      }
    }else if(this.data?.forgetPassword){
      if(value){
        this.authService.verifyResetPasswordOtp( { reset_password_token:value, email:this.data.email }).subscribe(res => {
          if(res?.status == HttpStatusCode.OK){
            this.localStorage.setStorage('email',this.data.email);
            this.globalService.successSnakBar(res.message);
            this.router.navigate(['/conform-password']);
            this.dialogRef.close();
          }
        });
      }
    }


    
  };

  resendOTP(){
    this.ngxOtp.clear();
    if(this.data?.verifyEmail){
      this.authService.resendOtp(this.data.email).subscribe((res) => {
        if(res.status == HttpStatusCode.OK){
          this.globalService.successSnakBar(`${res.message} to your ${this.data.email}`);
        }
       }
      );
    }else if(this.data.forgetPassword){
      this.authService.resendResetPasswordOtp(this.data.email).subscribe((res) => {
        if(res.status == HttpStatusCode.OK){
          this.globalService.successSnakBar(`${res.message} to your ${this.data.email}`);
        }
      });
    }
  };

  onSubmit(){
    if(this.form.invalid) return
    this.data.todoValue.title = this.form.value.todo
    this.dialogRef.close(this.data.todoValue);
  }

}
