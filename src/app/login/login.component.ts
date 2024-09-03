import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  private readonly users = [
    { username: 'super', password: '123', role: 'Super Admin' },
    { username: 'admin1', password: 'admin1', role: 'Group Admin' },
    { username: 'user1', password: 'user1', role: 'User' },
    { username: 'user2', password: 'user2', role: 'User' },
    // Add more as needed
  ];
  

  constructor(private router: Router) {}

  login() {
    const user = this.users.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      // Store user role in localStorage for simplicity
      localStorage.setItem('userRole', user.role);
      this.router.navigate([`${user.role.toLowerCase().replace(' ', '-')}`]);
    } else {
      alert('Invalid username or password');
    }
  }
}