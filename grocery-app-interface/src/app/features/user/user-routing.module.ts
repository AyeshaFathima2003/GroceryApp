import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AllproductsviewComponent } from './components/allproductsview/allproductsview.component';
import path from 'path';

const routes: Routes = [
  { path: 'home', 
    component: UserDashboardComponent, 
    children: [
      {path: 'allproductsview', component: AllproductsviewComponent}
    ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
