import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UsernavbarComponent } from '../../../../shared/components/usernavbar/usernavbar.component'; // Import UsernavbarComponent here
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [ UsernavbarComponent, MatSidenavModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
