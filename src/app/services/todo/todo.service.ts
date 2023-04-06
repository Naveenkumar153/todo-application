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
    return this.api.post('user/create/todos',data);
  };

  getTodo(data:any){
    return this.api.get(`user/getTodos?todos=${data}`);
  };

  updateTodo(data:any){
    return this.api.patch('user/updateTodos',data);
  };

  deleteTodo(data:any){
    return this.api.delete(`user/deleteTodos?userId=${data.userId}&todoId=${data.todo._id}`);
  }






}
