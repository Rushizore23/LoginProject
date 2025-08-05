import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  template: `
    <div class="container">
      <h2>Sign Up</h2>
      <form (ngSubmit)="onSignUp()">
        <input type="text" [(ngModel)]="userObj.name" name="name" placeholder="Name" required>
        <input type="text" [(ngModel)]="userObj.nid" name="nid" placeholder="NID (e.g., N12345)" required>
        <input type="password" [(ngModel)]="userObj.password" name="password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 40px;
      text-align: center;
    }

    input {
      display: block;
      margin: 15px auto;
      padding: 10px;
      width: 60%;
    }

    button {
      padding: 10px 30px;
      cursor: pointer;
    }
  `]
})
export class SignUpComponent {
  userObj = {
    name: '',
    nid: '',
    password: ''
  };

  constructor(private router: Router, private authservice: AuthService) {}

 onSignUp() {
    const nidPattern = /^N\d{5}$/;
    if (!this.userObj.name || !this.userObj.nid || !this.userObj.password) {
      alert('Please fill all fields.');
      return;
    }
    if (!nidPattern.test(this.userObj.nid)) {
      alert('NID must be in format N12345');
      return;
    }

    this.authservice.signupUser(this.userObj).subscribe({
  next: (res: any) => {
    alert(res.message);
    console.log('Redirecting to login...');
    this.router.navigate(['/login']);
  },
  error: (err) => {
    console.error(err);
    alert('Sign Up failed. Try again.');
  }
});
  }
}