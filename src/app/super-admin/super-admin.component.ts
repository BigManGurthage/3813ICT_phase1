import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, LogoutComponent]
})
export class SuperAdminComponent implements OnInit {
  users: any[] = [];
  groups: any[] = [];
  newGroupName: string = '';

  constructor(private userService: UserService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadGroups();
  }

  loadUsers(): void {
    this.users = this.storageService.getItem('users') || [];
  }

  loadGroups(): void {
    this.groups = this.storageService.getItem('groups') || [];
  }

  removeUser(userId: string): void {
    this.userService.deleteUser(userId);
    this.loadUsers();
  }

  promoteUser(userId: string): void {
    // Implement promotion logic
  }

  removeGroup(groupId: string): void {
    // Implement group removal logic
  }

  viewGroupDetails(groupId: string): void {
    // Implement view group details logic
  }

  createGroup(): void {
    const newGroup = { id: Date.now().toString(), name: this.newGroupName };
    let groups = this.storageService.getItem('groups') || [];
    groups.push(newGroup);
    this.storageService.setItem('groups', groups);
    this.newGroupName = '';
    this.loadGroups();
  }
}
