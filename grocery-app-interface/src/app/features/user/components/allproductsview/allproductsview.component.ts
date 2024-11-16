import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../services/userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allproductsview',
  templateUrl: './allproductsview.component.html',
  styleUrls: ['./allproductsview.component.css']
})
export class AllproductsviewComponent implements OnInit {
  products: any[] = [];

  constructor(private userService: UserserviceService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllProducts().subscribe(
      (response) => {
        this.products = response.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToWishlist(productId: string): void {
    this.userService.addToWishlist(productId).subscribe(
      (response) => {
        console.log('Product added to wishlist:', response);
        alert('Product added to wishlist successfully!');
      },
      (error) => {
        console.error('Error adding product to wishlist:', error);
        alert('Failed to add product to wishlist.');
      }
    );
  }

  viewProductDetails(productId: string): void {
    // Navigate to the ProductDetailsComponent with the product ID
    this.router.navigate(['/user/home/product-details', productId]);
  }
}
