import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../services/global/global.service';
import { HttpStatusCode } from '../enum/httpstatuscode';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private globalSnackbar:GlobalService, ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    // .pipe(
    //   tap(
    //      (error:any) => {
    //        if(error.status === HttpStatusCode.UNAUTHORIZED){
    //           return this.globalSnackbar.errorSnakBar('Your session has expired');
    //        }
    //      }
    //   ),
    //   catchError(
    //     (error:any) => {
    //     if(error.status ===  HttpStatusCode.UNKNOW_ERROR){
    //       return this.globalSnackbar.errorSnakBar(error.statusText || 'Something is wrong please try again');
    //     }
    //     return Observable
    //   })
    // );
  };
}
