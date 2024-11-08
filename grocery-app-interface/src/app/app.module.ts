import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth.service';
import { AdminModule } from './features/admin/admin.module';
import { UserModule } from './features/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    AdminModule,
    UserModule
  ],
  providers: [AuthService, provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
