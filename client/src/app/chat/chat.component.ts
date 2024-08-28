import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: string[] = [];
  newMessage: string = '';

  // Method to update new message
  updateNewMessage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.newMessage = inputElement.value;
  }

  // Method to send a message
  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push(this.newMessage);
      this.newMessage = '';
    }
  }
}
