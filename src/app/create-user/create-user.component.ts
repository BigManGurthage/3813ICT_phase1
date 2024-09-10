import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule] // Import ReactiveFormsModule here
})

export class CreateUserComponent {
  username: string = '';
  password: string = '';
  role: string = 'User';

  constructor(private router: Router) {}

  createUser() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((user: any) => user.username === this.username)) {
      alert('Username already exists.');
    } else {
      // Save the new user in localStorage
      users.push({ username: this.username, password: this.password, role: this.role });
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('User created successfully.');
      this.router.navigate(['/']); // Redirect to login page
    }
  }
  
}
