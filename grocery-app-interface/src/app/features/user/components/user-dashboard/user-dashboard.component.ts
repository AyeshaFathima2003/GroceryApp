import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private router: Router) { }
  logout() {
    // Clear user session data (e.g., JWT, user details from localStorage/sessionStorage)
    localStorage.removeItem('userToken');  // Adjust this as per your storage mechanism
    sessionStorage.removeItem('userToken');  // If using session storage
    
    // Optionally, redirect to login page
    this.router.navigate(['/auth/login']);
  }

}
