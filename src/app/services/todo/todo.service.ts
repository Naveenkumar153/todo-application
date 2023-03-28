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
    return this.api.post('user/user',data);
  };

  getTodo(data:any){
    return this.api.get('user/getTodos',data);
  };

  updateTodo(data:any){
    return this.api.put('user/user',data);
  };

  deleteTodo(data:any){
    return this.api.delete('user/user',data);
  }






}
