import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log the full error for debugging (optional)
        console.error('HTTP Error:', error);

        // Extract error message (customize based on actual error structure)
        const message = error.error?.message || error.message || 'Something went wrong!';

        // Show the message to the user via alert (you can replace this with a toast)
        alert(message);

        // Return the error to propagate it further
        return throwError(() => error);
      })
    );
  }
}
