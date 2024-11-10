import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../services/userservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allproductsview',
  templateUrl: './allproductsview.component.html',
  styleUrl: './allproductsview.component.css'
})
export class AllproductsviewComponent implements OnInit {
  products: any[] = [];

  constructor(private userService: UserserviceService) {}

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
}
