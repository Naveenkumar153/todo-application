import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpStatusCode } from 'src/app/enum/httpstatuscode';
import { todo } from 'src/app/interface/user.model';
import { SignupComponent } from 'src/app/pages/auth/signup/signup.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LocalstorageService } from 'src/app/services/storage/localstorage.service';
import { TodoService } from 'src/app/services/todo/todo.service';
import { OtpSixDigitComponent } from '../otp/otp.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit{

  todo:{ title: string, completed: boolean }[] = [];
  emailVerify:boolean = false;
  email:string = '';
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
    private matDialog: MatDialog,
  ){
    this.userId = this.localStorage.getStorage('id');
    this.emailVerify = this.localStorage.getStorage('email_verify');
    this.email = this.localStorage.getStorage('email');
  }

  userId:any;

  ngOnInit(): void {
    console.log(this.userId);
    console.log(this.emailVerify)
    if(!this.emailVerify){
      this.emailVerification(this.email)
    }
    this.getAllTodos();
  };

  getAllTodos(){
    this.todoService.getTodo(this.userId).subscribe((res) => {
      if(res.data.length === 0){
         this.todo.length = 0;
         return;
      }
      this.todo = [...res.data]
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
    this.editTodoData(value);
  }


  editTodoData(value:any){
    let editTodo = {
       editTodo:true,
       todoValue:value
    };
    
    this.matDialog.open(OtpSixDigitComponent, {
      panelClass:['otp-mat-dialog'],
      width:'600px',
      data:editTodo,
      disableClose:false,
    }).afterClosed()
    .subscribe((res) => {
      let values = {
        userId:this.userId,
        todo:res
      }
      this.todoService.updateTodo(values).subscribe(res => {
        console.log(res);
         if(res.status === HttpStatusCode.OK){
           this.globalService.successSnakBar(res?.message);
           this.getAllTodos();
         }else{
          this.globalService.errorSnakBar('somethings is wrong')
         }
      }); 
    });
  };


  deleteTodo(value:any){
    let values = {
      userId:this.userId,
      todo:value
    }
    console.log(values);
    this.todoService.deleteTodo(values).subscribe(res => {
         console.log(res);
         if(res.status === HttpStatusCode.OK){
           this.globalService.successSnakBar(res?.message);
           this.getAllTodos();
         }else{
          this.globalService.errorSnakBar('somethings is wrong')
         }
    });

  };



  public emailVerification(email:string){
    let verifyEmail = {
       email,
       verifyEmail:true
    };
    
    this.matDialog.open(OtpSixDigitComponent, {
      panelClass:['otp-mat-dialog'],
      width:'600px',
      data:verifyEmail,
      disableClose:true,
    }).afterClosed()
    .pipe()
    .subscribe(res => {
       console.log(res);
    });
  };


}
