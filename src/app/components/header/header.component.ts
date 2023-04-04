import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalstorageService } from 'src/app/services/storage/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navBarName:string = ''

  constructor(public authService:AuthService, public localStorage:LocalstorageService) {
    
  }
  
  ngOnInit(){
     let name = this.localStorage.getStorage('userName');
     this.navBarName = name.substr(0,2)
  }

  logout(){
    this.authService.logout();
  }

}
