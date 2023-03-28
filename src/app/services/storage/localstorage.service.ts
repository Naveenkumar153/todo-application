import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { 

  }

  setStorage(key:any,value:any){
    localStorage.setItem(key,JSON.stringify(value))
  }

  getStorage(key:any){
    return JSON.parse(localStorage.getItem(key)!);
  }

  removeStorage(key:any){
    localStorage.removeItem(key);
  }

  clearStorage(){
    localStorage.clear();
  }

}
