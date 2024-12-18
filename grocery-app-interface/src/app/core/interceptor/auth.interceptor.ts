import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const cloned = request.clone({
          setHeaders: {
            Authorization: `${token}`,
          },
        });
        return next.handle(cloned);
      }
    }
    return next.handle(request);
  }
}
