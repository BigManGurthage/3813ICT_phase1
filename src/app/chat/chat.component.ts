import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() channelName: string = '';  // Expecting channelName as input from parent
  messages: string[] = [];
  newMessage: string = '';

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push(this.newMessage);
      this.newMessage = '';  // Clear input after sending
    }
  }
}
