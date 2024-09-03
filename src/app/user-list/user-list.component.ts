import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  deleteUser(username: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.username !== username);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}
