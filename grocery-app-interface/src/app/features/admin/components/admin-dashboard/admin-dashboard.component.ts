import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router) { }
  logout() {
    // Clear user session data (e.g., JWT, user details from localStorage/sessionStorage)
    localStorage.removeItem('token');  // Adjust this as per your storage mechanism
    
    // Optionally, redirect to login page
    this.router.navigate(['/auth/login']);
  }
}


