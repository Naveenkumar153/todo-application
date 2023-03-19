import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../services/global/global.service';
import { HttpStatusCode } from '../enum/httpstatuscode';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private globalSnackbar:GlobalService, ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      // tap(
      //    (event) => {},
      //    (error:HttpErrorResponse) => {
      //      if(error.status === HttpStatusCode.UNAUTHORIZED){
      //         return this.globalSnackbar.errorSnakBar('Your session has expired');
      //      }

      //      if(error.status === HttpStatusCode.INTERNAL_SERVER_ERROR){
      //         return this.globalSnackbar.errorSnakBar(error.message || 'Something is wrong please try again');
      //      }

      //      if(error.status === HttpStatusCode.NOT_FOUND){
      //          return this.globalSnackbar.errorSnakBar(error.message || 'Not Found');
      //      }
      //    }
      // ),
      // catchError(
      //   (error:HttpErrorResponse) => {
      //   if(error.status ===  HttpStatusCode.UNKNOW_ERROR){
      //     return throwError(() => error);
      //   }
      //   return throwError(() => error)
      // })
    );
  };
}
