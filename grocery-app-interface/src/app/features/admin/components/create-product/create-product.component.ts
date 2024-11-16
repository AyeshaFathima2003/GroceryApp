import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  product = {
    name: '',
    description: '',
    price: null,
    category: '',
    stock: null,
    imageUrl: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    // Define the API endpoint
    const apiUrl = 'http://localhost:5000/api/product/createproduct';

    // Make the POST request to the API
    this.http.post(apiUrl, this.product).subscribe(
      response => {
        // Handle success response
        console.log('Product created successfully', response);
        // Redirect to another page (for example, product list page)
        this.router.navigate(['/admin/home/products']);
      },
      error => {
        // Handle error response
        console.error('Error creating product', error);
      }
    );
  }
}
