import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
    user = {
      username: '',
      email: '',
      password: '',
    };
  
    message: string = '';
  
    submitForm() {
      // Check if the form is valid
      if (this.user.username && this.user.email && this.user.password.length >= 6) {
        this.message = `Signup successful! Welcome, ${this.user.username}`;
        // In a real-world scenario, send data to the server here
  
      }
    }
}
