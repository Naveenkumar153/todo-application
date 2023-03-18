import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private snakBar:MatSnackBar) { }

  errorSnakBar(message:string){
    let action = 'DISMISS';
    this.snakBar.open(message, action ,{
       duration: 3000,
       panelClass:['error-snakBar']
    })
  };
  
  successSnakBar(message:string){
    let action = 'DISMISS';
    this.snakBar.open(message, action ,{
       duration: 3000,
       panelClass:['success-snakBar']
    })
  };
  
  infoSnakBar(message:string){
    let action = 'DISMISS';
    this.snakBar.open(message, action ,{
       duration: 3000,
       panelClass:['info-snakBar']
    })
  }


}

