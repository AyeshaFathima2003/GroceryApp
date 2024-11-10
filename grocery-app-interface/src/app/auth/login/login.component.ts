import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})

export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    console.log('LoginComponent initialized');
    // debugger;
  }
  
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        if(response.user.role === 'admin') {
          this.router.navigate(['/admin/admindashboard']);
        } else if(response.user.role === 'user') {
          this.router.navigate(['/user/home']);
        }
      },
      error => {
        console.error('Login failed', error);
        // Handle error here (e.g., show error message)
      }
    );
  }
}
