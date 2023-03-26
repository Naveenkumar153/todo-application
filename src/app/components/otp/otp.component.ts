import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
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

  getResendOtp:any;

  constructor(
    public dialogRef: MatDialogRef<OtpSixDigitComponent>,
    public router:Router,
    public globalService:GlobalService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private authService:AuthService,
    private localStorage:LocalstorageService
    ){
      
    }

    ngOnInit(): void {
    }

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
    if(value){
      this.authService.verifyOtp({ verification_token:value }).subscribe(res => {
        if(res.status == HttpStatusCode.OK){
          this.localStorage.setStorage('emailVerified',res.data);
          this.globalService.successSnakBar(res.message);
          this.router.navigateByUrl('/home', { replaceUrl:true });
          this.dialogRef.close();
        }
      });
    }
  };

  verifiEmail(){
    this.authService.resendOtp(this.data).subscribe((res) => {
      if(res.data.status == HttpStatusCode.OK){
        this.globalService.successSnakBar(`${res.data.message} to your ${this.data}`);
      }
     }
    );
  }

}
