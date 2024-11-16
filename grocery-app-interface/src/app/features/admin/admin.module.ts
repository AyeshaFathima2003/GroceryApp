import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllproductsviewComponent } from './components/allproductsview/allproductsview.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminserviceService } from './services/adminservice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AllproductsviewComponent,
    ProductDetailsComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule
  ],
  providers: [AdminserviceService]
})
export class AdminModule { }
