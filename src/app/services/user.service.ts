import { Injectable } from '@angular/core';

interface Channel {
  name: string;
  members: string[];
}

interface Group {
  name: string;
  members: string[];
  channels: Channel[];
}

interface User {
  username: string;
  groups: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User = { username: 'user1', groups: [] }; // Mock user
  private users: User[] = [
    { username: 'super', groups: [] },
    { username: 'admin1', groups: [] },
    { username: 'user1', groups: [] },
    { username: 'user2', groups: [] }
  ]; // Mock users

  private groups: Group[] = [
    {
      name: 'Justice League',
      members: ['super'],
      channels: [
        { name: 'General', members: [] },
        { name: 'Off-Topic', members: [] }
      ]
    },
    {
      name: 'Avengers',
      members: ['admin1'],
      channels: [
        { name: 'General', members: [] },
        { name: 'Strategy', members: [] }
      ]
    }
  ]; // Mock groups with channels

  getCurrentUser(): User {
    return this.currentUser;
  }

  getGroups(): Group[] {
    return this.groups;
  }

  getChannels(groupName: string): Channel[] {
    const group = this.groups.find(g => g.name === groupName);
    return group ? group.channels : [];
  }

  joinGroup(groupName: string): void {
    const group = this.groups.find(g => g.name === groupName);
    if (group && !this.currentUser.groups.includes(groupName)) {
      this.currentUser.groups.push(groupName);
      group.members.push(this.currentUser.username);
    }
  }

  leaveGroup(groupName: string): void {
    const index = this.currentUser.groups.indexOf(groupName);
    if (index > -1) {
      this.currentUser.groups.splice(index, 1);
      const group = this.groups.find(g => g.name === groupName);
      if (group) {
        const memberIndex = group.members.indexOf(this.currentUser.username);
        if (memberIndex > -1) {
          group.members.splice(memberIndex, 1);
        }
      }
    }
  }

  joinChannel(groupName: string, channelName: string): void {
    const group = this.groups.find(g => g.name === groupName);
    if (group) {
      const channel = group.channels.find(c => c.name === channelName);
      if (channel && !channel.members.includes(this.currentUser.username)) {
        channel.members.push(this.currentUser.username);
      }
    }
  }

  leaveChannel(groupName: string, channelName: string): void {
    const group = this.groups.find(g => g.name === groupName);
    if (group) {
      const channel = group.channels.find(c => c.name === channelName);
      if (channel) {
        const index = channel.members.indexOf(this.currentUser.username);
        if (index > -1) {
          channel.members.splice(index, 1);
        }
      }
    }
  }
  deleteUser(username: string): void {
    this.users = this.users.filter(user => user.username !== username);
    this.groups.forEach(group => {
      group.members = group.members.filter(member => member !== username);
      group.channels.forEach(channel => {
        channel.members = channel.members.filter(member => member !== username);
      });
    });
  }
}
