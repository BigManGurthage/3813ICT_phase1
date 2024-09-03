import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear user role from localStorage
    localStorage.removeItem('userRole');
    // Redirect to login page
    this.router.navigate(['/']);
  }
}
