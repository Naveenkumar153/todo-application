import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLoading = new Subject<boolean>();

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
  };

  showLoader(){
    this.isLoading.next(true);
  };

  hideLoader(){
    this.isLoading.next(false);
  }


}

