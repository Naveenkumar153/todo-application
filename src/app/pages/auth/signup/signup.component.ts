import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  constructor(private fb:NonNullableFormBuilder,public authService: AuthService){

  }
  ngOnInit(): void {
    
  }

  onSubmit(){
    if(!this.form.valid) return
    let data = this.form.value
    console.log(data);
    this.authService.register(data).subscribe(res => {
      // console.log(res.message)
      // console.log(res.error);
    })
  }
}
