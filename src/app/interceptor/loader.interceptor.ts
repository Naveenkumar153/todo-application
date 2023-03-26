import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { GlobalService } from '../services/global/global.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  

  constructor(private globalService:GlobalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.globalService.showLoader();

     return next.handle(request).pipe(
          finalize(() => this.globalService.hideLoader()),
     );
  }
}
