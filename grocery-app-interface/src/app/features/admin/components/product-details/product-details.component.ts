import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Navigation } from '@angular/router';
import { AdminserviceService } from '../../services/adminservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading = true;
  error: string | null = null;
  quantity: number = 1; // Default quantity

  constructor(
    private route: ActivatedRoute,
    private adminservice: AdminserviceService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      this.error = 'Product ID is missing.';
      this.isLoading = false;
      return;
    }

    this.adminservice.getProductDetails(productId).subscribe(
      (response) => {
        console.log('Product details:', response.products[0]._id);
        this.product = response.products[0];
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to fetch product details.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  deleteProduct(): void {
    if (!this.product?._id) {
      this.error = 'Product ID is not available for deletion.';
      return;
    }
  
    const confirmDelete = confirm(`Are you sure you want to delete ${this.product.name}?`);
    if (!confirmDelete) return;
  
    this.adminservice.deleteProduct(this.product._id).subscribe(
      () => {
        alert('Product deleted successfully.');
        this.router.navigate(['/admin/home/manageproducts']); // Navigate to product list after deletion
      },
      (error) => {
        this.error = 'Failed to delete product.';
        console.error(error);
      }
    );
  }  
}
