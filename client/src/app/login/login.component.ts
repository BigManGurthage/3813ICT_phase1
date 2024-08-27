import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  login(username: string, password: string) {
    // Implement login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  }
}
