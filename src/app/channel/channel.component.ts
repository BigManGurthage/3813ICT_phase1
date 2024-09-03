import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChannelComponent implements OnInit {
  groups: any[] = [];
  channels: any[] = [];
  newChannel = { groupName: '', channelName: '' };

  ngOnInit() {
    this.groups = JSON.parse(localStorage.getItem('groups') || '[]');
    this.channels = JSON.parse(localStorage.getItem('channels') || '[]');
  }

  createChannel() {
    if (!this.newChannel.groupName || !this.newChannel.channelName) {
      alert('Group name and channel name are required.');
      return;
    }

    const groupChannels = this.channels.find(c => c.groupName === this.newChannel.groupName) || { groupName: this.newChannel.groupName, channels: [] };

    if (groupChannels.channels.includes(this.newChannel.channelName)) {
      alert('Channel already exists in this group.');
      return;
    }

    groupChannels.channels.push(this.newChannel.channelName);
    const updatedChannels = this.channels.filter(c => c.groupName !== this.newChannel.groupName);
    updatedChannels.push(groupChannels);
    localStorage.setItem('channels', JSON.stringify(updatedChannels));
    this.channels = updatedChannels;
    this.newChannel = { groupName: '', channelName: '' };
  }
}
