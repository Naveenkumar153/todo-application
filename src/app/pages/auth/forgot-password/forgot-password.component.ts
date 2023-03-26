import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  ){

  }

  onSubmit(){

  }

  get email() {
    return this.form.controls['email'];
  }


}
