import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register(username: string, password: string) {
    // Implement your registration logic here
    console.log('Username:', username);
    console.log('Password:', password);
  }
}
