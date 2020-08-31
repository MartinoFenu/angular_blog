import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';

import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private authService: AuthService ) {} 

  //intercept every request to add the auth token
  //with JSONPlaceholder is not necessary, but is an example to add a token to outgoing requests
  intercept( req: HttpRequest<any>, next: HttpHandler ) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap( user => {
        if( !user ) return next.handle( req );
        const updatedReq = req.clone({
          params: new HttpParams().set( 'auth', user.token )
        });
        return next.handle( updatedReq );
      })
    )
  }
}