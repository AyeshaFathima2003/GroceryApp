import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AllproductsviewComponent } from './components/allproductsview/allproductsview.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

const routes: Routes = [
  { path: 'home', component: AdminDashboardComponent,
    children: [
      {path: 'manageproducts', component: AllproductsviewComponent},
      {path: 'product-details/:id', component: ProductDetailsComponent},
      {path: 'createproduct', component: CreateProductComponent}
    ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
