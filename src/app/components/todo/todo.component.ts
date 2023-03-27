import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  todo:{ _id: string, name: string }[]= [
    // { _id:'1', name:'data' },
    // { _id:'2', name:'Hello' },
    // { _id:'3', name:'Hey' },
    // { _id:'4', name:'Okay' },
  ];

  completedTodu:{ _id: string, name: string }[]= [
    // { _id:'1', name:'data' },
  ];

  form = this.fb.group({
    todo:[ '',[Validators.required]],
  });

  constructor(
    public router:Router,
    private fb:NonNullableFormBuilder,
    public globalService:GlobalService
  ){

  }

  submit(){
    console.log(this.router)
    // this.router.navigate(['/auth/signin'])
    this.router.navigate(['/signin'])
  }

  onSubmit(){
    if(!this.form.valid){
      this.globalService.errorSnakBar('Please enter the value')
      return
    }

    this.todo.push({ _id:'1', name:this.form.value.todo! });
    this.form.reset()


  }

  completeTodo(e:any){
    console.log(e)
  };

  editTodo(id:string){
    console.log(id)
  }
  deleteTodo(id:string){
    console.log(id)
    this.globalService.successSnakBar('Deleted successfully')
  }

}
