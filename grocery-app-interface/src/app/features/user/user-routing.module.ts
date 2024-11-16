import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AllproductsviewComponent } from './components/allproductsview/allproductsview.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: 'home', 
    component: UserDashboardComponent, 
    children: [
      {path: 'allproductsview', component: AllproductsviewComponent},
      {path: 'product-details/:id', component: ProductDetailsComponent},
      {path: 'wishlist', component: WishlistComponent},
      {path: 'cart', component: CartComponent}
    ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
