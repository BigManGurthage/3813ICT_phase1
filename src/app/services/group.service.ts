import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups = [
    // Example group structure
    { id: '1', name: 'General Chat', admins: ['super'], members: ['user1', 'user2'] }
  ];

  constructor() {}

  getGroups() {
    return this.groups;
  }

  createGroup(name: string, adminId: string) {
    const newGroup = {
      id: (this.groups.length + 1).toString(),
      name,
      admins: [adminId],
      members: []
    };
    this.groups.push(newGroup);
  }

  deleteGroup(groupId: string) {
    this.groups = this.groups.filter(group => group.id !== groupId);
  }

  // Add other group management methods as needed
}
