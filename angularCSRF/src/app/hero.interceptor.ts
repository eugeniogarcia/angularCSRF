import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,HttpHandler,HttpEvent,HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable} from 'rxjs';

/*
https://stackoverflow.com/questions/46040922/angular4-httpclient-csrf-does-not-send-x-xsrf-token

Additionally, if your code targets API via absolute URL, default CSRF interceptor will not
work out of the box. Instead you have to implement your own interceptor which does not ignore absolute routes
*/
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //In case we have changed the name of the header
    const headerName ='X-XSRF-TOKEN';
    let token = this.tokenExtractor.getToken() as string;
    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }
    return next.handle(req);
  }
}
