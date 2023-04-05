import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalstorageService } from 'src/app/services/storage/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  greeting:string = ''
  navBarName:string = ''

  constructor(public authService:AuthService, public localStorage:LocalstorageService) {
    
  }
  
  ngOnInit(){
     let name = this.localStorage.getStorage('userName');
     this.navBarName = name.substr(0,2)
     this.showGreetings()
  }

  showGreetings(){
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      this.greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greeting = "Good Afternoon";
    } else {
      this.greeting = "Good Evening";
    }
  }

  logout(){
    this.authService.logout();
  }

}
