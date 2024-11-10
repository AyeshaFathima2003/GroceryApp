import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/allproducts`);
  }

  getUserProfile(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${this.apiUrl}/user/profile`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/user/update`, userData).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
