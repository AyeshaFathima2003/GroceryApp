import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];  // Using 'any[]' to allow any structure for cartItems

  constructor(private userservice: UserserviceService) { }

  ngOnInit(): void {
    this.userservice.getCart().subscribe(response => {
      if (response && response.cart && response.cart.items) {
        this.cartItems = response.cart.items;  // Assert response as 'any[]'
      }
    });
  }
}
