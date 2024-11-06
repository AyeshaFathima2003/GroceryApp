import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserfooterComponent} from './components/userfooter/userfooter.component';
import { UsernavbarComponent } from './components/usernavbar/usernavbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserfooterComponent, UsernavbarComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'grocery-app-interface';
}
