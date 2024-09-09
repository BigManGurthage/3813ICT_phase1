import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, LogoutComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  getStarted(): void {
    console.log('Get Started button clicked');
  }
}
