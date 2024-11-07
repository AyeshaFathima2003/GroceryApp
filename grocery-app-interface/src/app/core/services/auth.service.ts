import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/user/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  isAuthenticated(): boolean {
    // Implement logic to check if the user is authenticated
    // For example, check if a JWT token exists in localStorage
    return !!localStorage
    
    .getItem('token');
  }

  getUserRole(): string | null {
    // Retrieve role from local storage or wherever it’s stored
    return localStorage.getItem('role'); // e.g., 'admin' or 'user'
  }

  // Example method for setting role (e.g., on login)
  setUserRole(role: string) {
    localStorage.setItem('role', role);

  }
}
