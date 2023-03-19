import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  form = this.fb.group({
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
  ){
    
  }

  onSubmit(){
    if(!this.form.valid) return
    let data = this.form.value
    this.authService.login(data).subscribe((res:any) => {
      console.log(res)
        if(res?.status_code === HttpStatusCode.OK){
          this.globalSnakbar.successSnakBar('Successfully login');
        }else{
          console.log(res.error)
            this.globalSnakbar.errorSnakBar(res?.error?.message);
        }
      }
    )
  }

}
