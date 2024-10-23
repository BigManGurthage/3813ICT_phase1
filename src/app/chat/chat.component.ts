import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import io, { Socket } from 'socket.io-client';  // Default import for io and Socket type
import Peer from 'peerjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() channelName: string = '';
  messages: any[] = [];
  newMessage: string = '';
  newImage: File | null = null;
  socket!: ReturnType<typeof io>;  // Correct type for socket instance
  peer!: Peer;
  peerId!: string;
  remotePeerId!: string;
  localStream!: MediaStream;
  remoteStream!: MediaStream;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');  // Initialize the socket connection
  }

  ngOnInit(): void {
    // Emit join channel event when component is initialized
    this.socket.emit('joinChannel', this.channelName);

    // Listen for new messages from the server
    this.socket.on('newMessage', (messageData: any) => {
      console.log('Message received from socket:', messageData);
      this.messages.push(messageData);  // Add the received message to the messages array
      console.log('Updated messages array:', this.messages);  // Log the updated messages array
    });

    // Set up PeerJS for video calls
    this.peer = new Peer({
      host: 'localhost',
      port: 9000,
      path: '/peerjs'
    });

    this.peer.on('open', (id) => {
      this.peerId = id;
      console.log('My peer ID is:', this.peerId);
    });

    this.peer.on('call', (call) => {
      // Answer the incoming call
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        this.localStream = stream;
        call.answer(stream); // Answer the call with the local stream
        call.on('stream', (remoteStream) => {
          this.remoteStream = remoteStream;
          this.displayRemoteStream();
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());  // Stop local stream
    }
    this.peer.destroy();  // Clean up PeerJS connection
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const messageData = {
        channelId: this.channelName,
        username: 'CurrentUsername',
        message: this.newMessage,
        avatar: 'path/to/avatar.jpg',
      };

      this.socket.emit('sendMessage', messageData);  // Send message through Socket.io
      this.newMessage = '';  // Clear the input field after sending the message
    }
  }

  handleImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.newImage = target.files[0];  // Set the new image for upload
    }
  }

  sendImageMessage(): void {
    if (this.newImage) {
      const formData = new FormData();
      formData.append('channelId', this.channelName);
      formData.append('username', 'CurrentUsername');
      formData.append('image', this.newImage);

      // Send image to the server
      this.http.post('/api/send-image', formData).subscribe((res: any) => {
        this.socket.emit('sendMessage', {
          channelId: this.channelName,
          username: 'CurrentUsername',
          imageUrl: res.imageUrl,
        });
        this.newImage = null;  // Reset the new image field
      });
    }
  }

  startVideoCall(): void {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      this.localStream = stream;
      this.displayLocalStream();
      const call = this.peer.call(this.remotePeerId, stream);
      call.on('stream', (remoteStream) => {
        this.remoteStream = remoteStream;
        this.displayRemoteStream();
      });
    });
  }

  displayLocalStream(): void {
    const videoElement = document.querySelector('#localVideo') as HTMLVideoElement;
    if (videoElement) {
      videoElement.srcObject = this.localStream;
      videoElement.play();  // Play the local video stream
    }
  }

  displayRemoteStream(): void {
    const videoElement = document.querySelector('#remoteVideo') as HTMLVideoElement;
    if (videoElement) {
      videoElement.srcObject = this.remoteStream;
      videoElement.play();  // Play the remote video stream
    }
  }
}
