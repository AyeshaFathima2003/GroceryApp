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

  constructor(private authService: AuthService) {}
  ngOnInit() {
    console.log('LoginComponent initialized');
    // debugger;
  }
  
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        // Handle successful login here (e.g., redirect to dashboard)
      },
      error => {
        console.error('Login failed', error);
        // Handle error here (e.g., show error message)
      }
    );
  }
}
