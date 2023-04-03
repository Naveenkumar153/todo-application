import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpStatusCode } from '../enum/httpstatuscode';
import { GlobalService } from '../services/global/global.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private globalService:GlobalService, private authService:AuthService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.UNAUTHORIZED) {
          this.authService.logout();
          this.globalService.errorSnakBar('Unauthorized user please register' || err.statusText);

        }else if(err.status == HttpStatusCode.BAD_REQUEST){
          this.globalService.errorSnakBar(err.error?.message || err.statusText)
        }else if(err.status == HttpStatusCode.INTERNAL_SERVER_ERROR){
          this.globalService.errorSnakBar(err.error?.message || err.statusText)
        }else if(err.status == HttpStatusCode.NOT_FOUND){
          this.globalService.errorSnakBar(err.error?.message || err.statusText)
        }else if(err.status == HttpStatusCode.UNKNOW_ERROR){
          this.globalService.errorSnakBar('Something went wrong please try again' || err.statusText)
        }
        return throwError(() => err);
      }));

  }
}
