import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private api:ApiService
  ) { 

  };


  createTodo(data:any){
    console.log(data)
    return this.api.post('user/create/todos',data);
  };

  getTodo(data:any){
    return this.api.get('user/getTodos',data);
  };

  updateTodo(data:any){
    return this.api.patch('user/updateTodos',data);
  };

  deleteTodo(data:any){
    console.log(data.todo._id);
    return this.api.delete(`user/deleteTodos?userId=${data.userId}&todoId=${data.todo._id}`);
  }






}
