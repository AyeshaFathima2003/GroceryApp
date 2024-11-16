import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
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
    return this.http.put(`${this.apiUrl}/user/update`, userData).pipe(
      catchError(this.handleError)
    );
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

  addToWishlist(productId: string): Observable<any> {
    const body = { productId };
    return this.http.post(`${this.apiUrl}/user/wishlist`, body);
  }

  getWishlist(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/wishlist`); // Make GET request to the wishlist API
  }

  removeProductFromWishlist(productId: string): Observable<any> {
    const body = { productId }; // Prepare the request body with the productId
    return this.http.delete(`${this.apiUrl}/user/wishlist`, { body });
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const body = {
      productId: productId, // Use the product ID
      quantity: quantity // Quantity to be added to the cart
    };
    console.log('Adding to cart:', body);

    return this.http.post(`${this.apiUrl}/user/cartadd`, body); // Make POST request to add product to the cart
  }

  getCart(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/getcart`);
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
