import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  styleUrls: ['./user.component.css'],
  imports: [CommonModule, LogoutComponent] // Add CommonModule here
})
export class UserComponent implements OnInit {
  currentUser: any = { username: '', groups: [] };
  groups: any[] = [];
  selectedGroupName: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser() || { username: '', groups: [] };
    this.groups = this.userService.getGroups() || [];
  }

  joinGroup(groupName: string) {
    this.userService.joinGroup(groupName);
    alert('Joined the group!');
    this.ngOnInit(); // Refresh data
  }

  leaveGroup(groupName: string) {
    this.userService.leaveGroup(groupName);
    alert('Left the group!');
    this.ngOnInit(); // Refresh data
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.userService.deleteUser(this.currentUser.username);
      this.router.navigate(['/logout']);
    }
  }
}
