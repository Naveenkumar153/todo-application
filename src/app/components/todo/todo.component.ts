import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { todo } from 'src/app/interface/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LocalstorageService } from 'src/app/services/storage/localstorage.service';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit{

  todo:{ title: string, completed: boolean }[] = [];

  completedTodu = [];

  form = this.fb.group({
    todo:[ '',[Validators.required]],
  });

  constructor(
    public router:Router,
    private fb:NonNullableFormBuilder,
    public globalService:GlobalService,
    public authService:AuthService,
    public todoService: TodoService,
    public localStorage: LocalstorageService,
    public route: ActivatedRoute ,
  ){

  }

  userId:any;

  ngOnInit(): void {
    this.getAllTodos();
  };

  getAllTodos(){
    this.userId = this.localStorage.getStorage('id');
    console.log(this.userId)
    this.todoService.getTodo(this.userId).subscribe((res) => {
      if(res.data.length === 0){
         this.todo.length = 0;
         return;
      }
      this.todo.push(...res.data)
      console.log(this.todo);
     
    });
  }

  onSubmit(){
    if(!this.form.valid){
      this.globalService.errorSnakBar('Please enter the value')
      return
  };

    // let todoValue = this.form.value.todo!;

    let values = {
        completed:false,
        title:this.form.value.todo!,
        id:this.userId,
    };
    console.log(values)

    this.todoService.createTodo(values).subscribe(res => {
        if(res.status === HttpStatusCode.OK){
          this.globalService.successSnakBar(res.message);
          this.getAllTodos();
        }
    });

    this.form.reset()
  }

  completeTodo(e:any){
    console.log(e)
  };

  editTodo(value:any){
    console.log(value)
  }
  deleteTodo(value:any){
    console.log(value)
    this.globalService.successSnakBar('Deleted successfully')
  };


}
