import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = { username: 'user1', groups: ['Group 1'] }; // Mock user
  private groups = [
    { name: 'Justice League', members: ['user1'] }, // Mock group
    { name: 'Avengers', members: [] } // Mock group
  ]; // Mock groups

  getCurrentUser() {
    return this.currentUser;
  }

  getGroups() {
    return this.groups;
  }

  joinGroup(groupName: string) {
    const group = this.groups.find(g => g.name === groupName);
    if (group && !this.currentUser.groups.includes(groupName)) {
      this.currentUser.groups.push(groupName);
      group.members.push(this.currentUser.username);
    }
  }

  leaveGroup(groupName: string) {
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

  deleteUser(username: string) {
    console.log(`User ${username} deleted.`);
  }
}
