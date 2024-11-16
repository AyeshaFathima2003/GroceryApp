import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminserviceService } from '../../services/adminservice.service';

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

  constructor(private http: HttpClient, private router: Router, private adminservice: AdminserviceService) {}

  onSubmit(): void {
    // Define the API endpoint
    this.adminservice.createProduct(this.product).subscribe(
      response => {
        // Handle success response
        console.log('Product created successfully', response);
        // Redirect to the product list page or another appropriate page
        this.router.navigate(['/admin/home/products']);
      },
      error => {
        // Handle error response
        console.error('Error creating product', error);
      }
    );
  }
}
