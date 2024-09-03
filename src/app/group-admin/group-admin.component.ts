import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
import { GroupService } from '../services/group.service';

interface Group {
  id: string;
  name: string;
}

@Component({
  selector: 'app-group-admin',
  templateUrl: './group-admin.component.html',
  styleUrls: ['./group-admin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, LogoutComponent]
})
export class GroupAdminComponent implements OnInit {
  groups: Group[] = [];
  newGroupName: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groups = this.storageService.getItem('groups') || [];
  }

  removeGroup(groupId: string): void {
    let groups: Group[] = this.storageService.getItem('groups') || [];
    groups = groups.filter((g: Group) => g.id !== groupId);
    this.storageService.setItem('groups', groups);
    this.loadGroups();
  }

  createGroup(): void {
    const newGroup: Group = { id: Date.now().toString(), name: this.newGroupName };
    let groups: Group[] = this.storageService.getItem('groups') || [];
    groups.push(newGroup);
    this.storageService.setItem('groups', groups);
    this.newGroupName = '';
    this.loadGroups();
  }
}
