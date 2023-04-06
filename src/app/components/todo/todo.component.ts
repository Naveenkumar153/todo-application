import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  styleUrls: ['./todo.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class TodoComponent implements OnInit{

  totalTodo:{ title: string, completed: boolean }[] = [];
  // completedTodo:{ title: string, completed: boolean, _id:string }[] = [];
  emailVerify:boolean = false;
  email:string = '';

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
    public changeDetectionRef:ChangeDetectorRef
  ){
    this.userId = this.localStorage.getStorage('id');
    this.emailVerify = this.localStorage.getStorage('email_verify');
    this.email = this.localStorage.getStorage('email');
  }

  userId:any;

  ngOnInit(): void {
    if(!this.emailVerify){
      this.emailVerification(this.email)
    }
    this.getAllTodos();
  };

  getAllTodos(){
    this.todoService.getTodo(this.userId).subscribe((res) => {
      if (res.data.length === 0) {
        this.totalTodo.length = 0;
        this.totalTodo = [...res.data]
        this.changeDetectionRef.detectChanges();
        return;
      }

      this.totalTodo = [...res.data]
      this.changeDetectionRef.detectChanges();
    
      // let values;
      // values = [...res.data];
      // const newTotalTodo:any[] = [];
      // const newCompletedTodo:any[] = [];
    
      // values.forEach((i) => {
      //   const newItem = { ...i };
      //   if (i.completed) {
      //     if (!this.completedTodo.some((item) => item._id === newItem._id)) {
      //       newCompletedTodo.push(newItem);
      //     }
      //   } else {
      //     if (!this.totalTodo.some((item) => item._id === newItem._id)) {
      //       newTotalTodo.push(newItem);
      //     }
      //   }
      // });
    
      // // Update the arrays
      // this.totalTodo = [...this.totalTodo, ...newTotalTodo];
      // this.completedTodo = [...this.completedTodo, ...newCompletedTodo];
    
      // // Detect changes and update the UI
    });
  }

  onSubmit(){
    if(!this.form.valid){
      this.globalService.errorSnakBar('Please enter the value')
      return
    };

    let values = {
        completed:false,
        title:this.form.value.todo!,
        id:this.userId,
    };

    this.todoService.createTodo(values).subscribe(res => {
        if(res.status === HttpStatusCode.OK){
          this.globalService.successSnakBar(res.message);
          this.getAllTodos();
        }
    });

    this.form.reset()
  }

  // completeTodo(e:any,item:any){
  //   item.completed  = e.checked
  //   let values = {
  //     userId:this.userId,
  //     todo:item
  //   }
  //   this.todoService.updateTodo(values).subscribe(res => {
  //      if(res.status === HttpStatusCode.OK){
  //        this.globalService.successSnakBar(res?.message);
  //        this.getAllTodos();
         
  //      }else{
  //       this.globalService.errorSnakBar('somethings is wrong')
  //      }
  //   }); 
  // };
  
  editTodo(value:any){
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
    this.todoService.deleteTodo(values).subscribe(res => {
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
    .subscribe();
  };


}
