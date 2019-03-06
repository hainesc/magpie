import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookie: CookieService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cookie.check('BID')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookie.get('BID')}`
        }
      });
      console.log(this.cookie.get('BID'))
    }
    // TODO: Maybe we should not send cookie in the header of request.
    return next.handle(request);
  }
}
