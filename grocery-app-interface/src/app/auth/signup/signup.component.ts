import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  street: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  pin: string = '';
  logo: string = '../../assets/logo.png';
  card: string = '../../assets/signup.png';

  signupForm: FormGroup;
  submitted = false;
  imageUrl: string = '../../assets/signup.png';
  ngOnInit() {
    console.log('Signup initialized');
  }

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    // Handle signup logic here (e.g., API call)
    console.log('Signup successful', this.signupForm.value);
  }
}
