import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { OtpSixDigitComponent } from 'src/app/components/otp/otp.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
    password:['',[Validators.required]]
  });
  constructor(
    private fb:NonNullableFormBuilder,
    public authService: AuthService,
    public globalSnakbar:GlobalService,
    private matDialog: MatDialog,
  ){

  }
  ngOnInit(): void {
    
  }

  onSubmit(){
    if(!this.form.valid) return
    let data = this.form.value
    console.log(data);
    this.authService.register(data).subscribe(res => {
        
       if(res.status === HttpStatusCode.OK){
          // this.globalSnakbar.successSnakBar(res.message);
          this.globalSnakbar.successSnakBar('OTP sent to your register email');
          this.emailVerification(this.form.value.email!);
       }
    })
  };

  emailVerification(email:string){
    console.log(email);
    this.matDialog.open(OtpSixDigitComponent, {
      panelClass:['otp-mat-dialog'],
      width:'600px',
      data:email
    }).afterClosed()
    .pipe(filter((res) => res.status === HttpStatusCode.OK ))
    .subscribe((data) => {
      console.log(data);
    });
  }
}
