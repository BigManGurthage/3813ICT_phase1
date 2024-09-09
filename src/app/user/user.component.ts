import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LoginComponent, CommonModule, ChatComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: any = { username: '', groups: [] };
  groups: any[] = [];
  selectedGroup: string | null = null;
  channels: any[] = [];
  selectedChannel: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.groups = this.userService.getGroups();
  }

  joinGroup(groupName: string): void {
    this.userService.joinGroup(groupName);
    this.ngOnInit(); // Refresh data
  }

  leaveGroup(groupName: string): void {
    this.userService.leaveGroup(groupName);
    this.selectedGroup = null; // Deselect group if user leaves it
    this.ngOnInit(); // Refresh data
  }

  selectGroup(groupName: string): void {
    this.selectedGroup = groupName;
    this.channels = this.userService.getChannels(groupName);
    this.selectedChannel = null; // Reset channel selection when switching groups
  }

  joinChannel(channelName: string): void {
    if (this.selectedGroup) {
      this.userService.joinChannel(this.selectedGroup, channelName);
      this.selectedChannel = channelName; // Set the selected channel to display chat
    }
  }

  leaveChannel(channelName: string): void {
    if (this.selectedGroup) {
      this.userService.leaveChannel(this.selectedGroup, channelName);
      this.selectedChannel = null; // Deselect channel if user leaves it
    }
  }
}
