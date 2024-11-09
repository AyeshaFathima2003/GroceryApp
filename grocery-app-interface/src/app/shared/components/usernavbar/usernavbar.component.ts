import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, MatSidenavModule, MatListModule, MatIconModule],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.css'
})
export class UsernavbarComponent {

}
