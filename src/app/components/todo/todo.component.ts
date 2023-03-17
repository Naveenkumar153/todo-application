import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  form = this.fb.group({
    todo:[ '',[Validators.required]],
  });

  constructor(public router:Router,private fb:NonNullableFormBuilder){

  }

  submit(){
    console.log(this.router)
    // this.router.navigate(['/auth/signin'])
    this.router.navigate(['/signin'])
  }

  onSubmit(){
    if(!this.form.valid) return
    let data = this.form.value
    console.log(data);
  }

}
