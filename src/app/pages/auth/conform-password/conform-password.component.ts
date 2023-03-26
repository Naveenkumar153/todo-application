import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength';

@Component({
  selector: 'app-conform-password',
  templateUrl: './conform-password.component.html',
  styleUrls: ['./conform-password.component.scss']
})
export class ConformPassword {

  showPassword: boolean = false;
  
  form = this.fb.group({
    password:['',[Validators.required,Validators.minLength(8),createPasswordStrengthValidator()]]
  });

  constructor(
    private fb:NonNullableFormBuilder,
    private router:Router,
  ){

  
  }


  onSubmit(){
    
  }

  get password() {
    return this.form.controls['password'];
  }  

}
