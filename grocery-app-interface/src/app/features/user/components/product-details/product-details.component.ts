import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../../services/userservice.service';
import { HttpClient } from '@angular/common/http';

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
    private userService: UserserviceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      this.error = 'Product ID is missing.';
      this.isLoading = false;
      return;
    }

    this.userService.getProductDetails(productId).subscribe(
      (response) => {
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

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(productId: string): void {
    this.userService.addToCart(productId, this.quantity).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        alert('Product added to cart!');
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart');
      }
    );
  }
}
