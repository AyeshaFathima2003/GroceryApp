import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      // Clone the request to add the new header
      request = request.clone({
        setHeaders: {
          Authorization: ` ${token}`
        }
      });
    }
    console.log('Request:', request);
    // Pass the modified request to the next handler
    return next.handle(request);
  }
}
