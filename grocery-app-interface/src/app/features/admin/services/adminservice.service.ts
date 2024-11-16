import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/allproducts`);
  }

  getProductDetails(productId: string): Observable<any> {
    const url = `${this.apiUrl}/product/searchproduct?productId=${productId}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching product details:', error);
        return throwError(() => new Error('Failed to fetch product details'));
      })
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product/deleteproduct?id=${id}`);
  }
}
