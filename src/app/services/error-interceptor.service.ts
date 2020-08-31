import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

  handleErrorMessages( errorRes: HttpErrorResponse ) {
    let errorMsg = '';
    if (errorRes.error instanceof ErrorEvent) {
      // client-side error
      errorMsg = 'Please check your internet connection';
    } else {
      // server-side error
      switch (errorRes.error.error.message ) {
        case 'INVALID_EMAIL':
          errorMsg = 'Invalid Email or Password';
          break;
        case 'USER_NOT_FOUND':
          errorMsg = 'Invalid Email or Password';
          break;
        case 'USER_DISABLED':
          errorMsg = 'Your Account is disabled, please contact the administrator';
          break;
        default: 
        errorMsg = 'An unexpected error occured, please try again later';
      }
    }
    return errorMsg;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError( ( errorRes: HttpErrorResponse ) => {
          return throwError(this.handleErrorMessages( errorRes ));
        })
      )
  }
}