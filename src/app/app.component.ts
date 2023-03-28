import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { LocalstorageService } from './services/storage/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
         public auth: AuthService,
         public router:Router,
         public storage:LocalstorageService
    ) {
        this.auth.getToken().then(token => {
            this.auth.updateToken(token);
            if(this.auth.isLoggedIn()){
                this.router.navigateByUrl('/home')
            };
        });
    }
}
