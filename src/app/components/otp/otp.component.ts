import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpSixDigitComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OtpSixDigitComponent>,
    public router:Router,
    public globalService:GlobalService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private authService:AuthService,
    ){
      
    }

    ngOnInit(): void {
      console.log(this.data);
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
    console.log(value);
    if(value){
      this.dialogRef.close();
      this.globalService.successSnakBar('email verified successfully')
      this.router.navigateByUrl('/home');
    }
  };

  verifiEmail(){
    this.authService.resendEmailVerification(this.data).subscribe((res) => {
        this.globalService.successSnakBar(`'OTP sent to your ${this.data}`);
        console.log(res);
    });
  }

}
