import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router'; // Import RouterModule here


@Component({
  selector: 'app-usernavbar',
  standalone: true,
  imports: [MatMenuModule, RouterModule],
  templateUrl: './usernavbar.component.html',
  styleUrl: './usernavbar.component.css'
})
export class UsernavbarComponent {

}
