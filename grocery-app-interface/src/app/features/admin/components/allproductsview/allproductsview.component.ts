import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminserviceService } from '../../services/adminservice.service';

@Component({
  selector: 'app-allproductsview',
  templateUrl: './allproductsview.component.html',
  styleUrls: ['./allproductsview.component.css']
})
export class AllproductsviewComponent implements OnInit {
  products: any[] = [];

  constructor(private adminService: AdminserviceService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getAllProducts().subscribe(
      (response) => {
        this.products = response.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  navigateToCreateProduct(): void {
    this.router.navigate(['/admin/home/createproduct']);
  }

  viewProductDetails(productId: string): void {
    // Navigate to the ProductDetailsComponent with the product ID
    this.router.navigate(['/admin/home/product-details', productId]);
  }
}
