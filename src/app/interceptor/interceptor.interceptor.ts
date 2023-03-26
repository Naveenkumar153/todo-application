import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, retry, switchMap, tap, throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../services/global/global.service';
import { HttpStatusCode } from '../enum/httpstatuscode';
import { LocalstorageService } from '../services/storage/localstorage.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(
    private globalSnackbar:GlobalService,
    private storage:LocalstorageService,
    private auth:AuthService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const isApiUrl = request.url.startsWith(environment.serverBaseUrl);
    const token    = this.auth.isLoggedIn();

    if(token && isApiUrl){
      if(token && isApiUrl){
        request = request.clone({
            setHeaders:{
              Authorization: `Bearer ${token}`
            }
        })
      }
    }
    return next.handle(request);

    // return this.auth.isLoggedIn().pipe(
    //   switchMap(token => {
    //       console.log('token', token);
    //     }
    //   )
    // )

  };
}
