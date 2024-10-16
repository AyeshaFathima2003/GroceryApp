import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';
import { UserfooterComponent } from './components/userfooter/userfooter.component';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserfooterComponent,
    UsernavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  ],
  providers: [AuthService, provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
