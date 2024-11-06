import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
// Import your other components here

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: LoginComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },// Add your other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
