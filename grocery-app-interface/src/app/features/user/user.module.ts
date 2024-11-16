import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllproductsviewComponent } from './components/allproductsview/allproductsview.component';
import { UserRoutingModule } from './user-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserserviceService } from './services/userservice.service';
import { AuthInterceptor } from '../../core/interceptor/auth.interceptor';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AllproductsviewComponent,
    ProductDetailsComponent,
    WishlistComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserserviceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class UserModule { }
