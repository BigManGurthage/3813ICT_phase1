import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';

interface Channel {
  id: string;
  name: string;
}

@Component({
  selector: 'app-group-admin',
  templateUrl: './group.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, LogoutComponent]
})
export class GroupComponent implements OnInit {
  channels: Channel[] = [];
  newChannelName: string = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadChannels();
  }

  loadChannels(): void {
    this.channels = this.storageService.getItem('channels') || [];
  }

  removeChannel(channelId: string): void {
    let channels = this.storageService.getItem('channels') || [];
    channels = channels.filter((c: Channel) => c.id !== channelId);
    this.storageService.setItem('channels', channels);
    this.loadChannels();
  }

  viewChannelDetails(channelId: string): void {
    // Implement view channel details logic
  }

  createChannel(): void {
    const newChannel: Channel = { id: Date.now().toString(), name: this.newChannelName };
    let channels = this.storageService.getItem('channels') || [];
    channels.push(newChannel);
    this.storageService.setItem('channels', channels);
    this.newChannelName = '';
    this.loadChannels();
  }
}
