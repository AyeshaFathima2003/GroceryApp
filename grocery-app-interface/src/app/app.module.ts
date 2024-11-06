import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { LoginComponent } from '../app/components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from '../app/components/signup/signup.component';
import { UserfooterComponent } from './components/userfooter/userfooter.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { AuthService } from './service/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserfooterComponent,
    UsernavbarComponent,
    SignupComponent,
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
  ],
  providers: [AuthService, provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
