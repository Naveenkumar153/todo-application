import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { OtpSixDigitComponent } from 'src/app/components/otp/otp.component';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  form = this.fb.group({
    email:['',{
      validators:[Validators.required,Validators.email],
      updateOn:'blur'
    }],
  });

  constructor(
    private fb:NonNullableFormBuilder,
    public router:Router,
    private matDialog: MatDialog,
    private authService:AuthService,
    public globalSnakbar:GlobalService,
  ){

  }

  onSubmit(){

    
    if(!this.form.valid) return;
    let email = this.form.value

    this.authService.resetPasswordOtp(email).subscribe((res) => {
       this.globalSnakbar.successSnakBar(`Reset password OTP sent to your ${res.data.email}`);
       this.resetPasswordOtp(res.data.email)
    });

    
    
  }

  resetPasswordOtp(email:string){
    let forgetPassword = {
      forgetPassword:true,
      email:email
    };
    this.matDialog.open(OtpSixDigitComponent, {
      panelClass:['otp-mat-dialog'],
      width:'600px',
      data:forgetPassword,
      disableClose:true,
    }).afterClosed()
    .pipe(filter((res) => res.status === HttpStatusCode.OK ))
    .subscribe();
  }


  get email() {
    return this.form.controls['email'];
  }


}
