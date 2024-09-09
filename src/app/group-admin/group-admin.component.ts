import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';

interface Group {
  id: string;
  name: string;
  creatorId: string; // Add creatorId to identify the creator
}

interface Channel {
  id: string;
  name: string;
  groupId: string;
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
  channels: Channel[] = [];
  newGroupName: string = '';
  newChannelName: string = '';
  selectedGroupId: string | null = null;
  userIdToBan: string = '';
  reportReason: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groups = this.storageService.getItem('groups') || [];
  }

  loadChannels(groupId: string): void {
    this.channels = this.storageService.getItem('channels')?.filter((c: Channel) => c.groupId === groupId) || [];
  }

  createGroup(): void {
    const newGroup: Group = { id: Date.now().toString(), name: this.newGroupName, creatorId: 'admin-id' }; // Replace 'admin-id' with the actual ID of the admin
    let groups = this.storageService.getItem('groups') || [];
    groups.push(newGroup);
    this.storageService.setItem('groups', groups);
    this.newGroupName = '';
    this.loadGroups();
  }

  removeGroup(groupId: string): void {
    let groups = this.storageService.getItem('groups') || [];
    groups = groups.filter((g: Group) => g.id !== groupId);
    this.storageService.setItem('groups', groups);

    // Remove associated channels
    let channels = this.storageService.getItem('channels') || [];
    channels = channels.filter((c: Channel) => c.groupId !== groupId);
    this.storageService.setItem('channels', channels);

    this.loadGroups();
  }

  createChannel(): void {
    if (this.selectedGroupId) {
      const newChannel: Channel = { id: Date.now().toString(), name: this.newChannelName, groupId: this.selectedGroupId };
      let channels = this.storageService.getItem('channels') || [];
      channels.push(newChannel);
      this.storageService.setItem('channels', channels);
      this.newChannelName = '';
      this.loadChannels(this.selectedGroupId);
    }
  }

  removeChannel(channelId: string): void {
    let channels = this.storageService.getItem('channels') || [];
    channels = channels.filter((c: Channel) => c.id !== channelId);
    this.storageService.setItem('channels', channels);
    if (this.selectedGroupId) {
      this.loadChannels(this.selectedGroupId);
    }
  }

  banUser(userId: string): void {
    // Simple implementation: In practice, this might involve updating user roles or statuses
    alert(`User ${userId} has been banned.`);
  }

  reportToSuperAdmin(reason: string): void {
    const reports = this.storageService.getItem('reports') || [];
    const newReport = { id: Date.now().toString(), reason };
    reports.push(newReport);
    this.storageService.setItem('reports', reports);
    alert('Report sent to Super Admin.');
  }
}
