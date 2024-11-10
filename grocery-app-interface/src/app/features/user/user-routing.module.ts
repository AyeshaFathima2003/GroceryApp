import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AllproductsviewComponent } from './components/allproductsview/allproductsview.component';

const routes: Routes = [
  { path: 'userdashboard', component: UserDashboardComponent },
  { path: 'product', component: AllproductsviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
