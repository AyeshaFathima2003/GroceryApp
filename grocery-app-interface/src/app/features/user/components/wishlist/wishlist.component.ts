import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../services/userservice.service'; // Your service to handle API calls

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any = []; // To store the wishlist products
  isLoading: boolean = true; // To show loading indicator while fetching data
  error: string | null = null; // To show any error message

  constructor(private userService: UserserviceService) {}

  ngOnInit(): void {
    this.fetchWishlist();
  }

  // Fetch the wishlist data
  fetchWishlist(): void {
    this.userService.getWishlist().subscribe(
      (response) => {
        console.log('Wishlist products:', response);
        if (response?.wishlist?.products) {
          this.wishlist = response.wishlist.products; // Store the products in wishlist array
        } else {
          this.error = 'No products found in your wishlist.';
        }
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Failed to load wishlist products.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  // Increase quantity
  increaseQuantity(product: any) {
    if (product.quantity) {
      product.quantity++;
    } else {
      product.quantity = 2; // Set initial quantity
    }
  }

  // Decrease quantity
  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  // Remove product from wishlist
  removeProduct(productId: string): void {
    const productIndex = this.wishlist.findIndex((product: any) => product.id === productId);
    if (productIndex === -1) return; // If product not found, do nothing

    this.userService.removeProductFromWishlist(productId).subscribe(
      () => {
        this.wishlist.splice(productIndex, 1);
        console.log(`Product with ID ${productId} removed from wishlist`);
      },
      (error) => {
        this.error = 'Failed to remove product from wishlist.';
        console.error(error);
      }
    );
  }

  addToCart(product: any): void {
    // Check if _id exists
    if (!product._id) {
      this.error = 'Product ID not found.';
      console.error('Product ID not found:', product);
      return;
    }
  
    const body = {
      productId: product._id, // Use the correct product _id
      quantity: product.quantity || 1 // Use the quantity, default to 1 if not defined
    };
  
    this.userService.addToCart(product._id, body.quantity).subscribe(
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
