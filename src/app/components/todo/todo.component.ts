import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  constructor(public router:Router){

  }

  submit(){
    console.log(this.router)
    // this.router.navigate(['/auth/signin'])
    this.router.navigate(['/signin'])
  }
}
