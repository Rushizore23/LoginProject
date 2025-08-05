import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { HttpErrorResponse } from '@angular/common/http'; 


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']


  
})
export class LoginComponent {
  loginObj: any = {
    nid: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const nidPattern = /^N\d{5}$/;

    if (!this.loginObj.nid || !this.loginObj.password) {
      alert('Please enter login details.');
      return;
    }

    if (!nidPattern.test(this.loginObj.nid)) {
      alert('Please enter correct NID (e.g., N12345).');
      return;
    }

    this.authService.loginUser(this.loginObj).subscribe({
      next: (response: any) => {
        console.log("Response from backend:", response);

        if (response.success) {
          alert('Login successful');

          // ✅ Only store NID, not the full object
          localStorage.setItem('loggedInNID', this.loginObj.nid);

          // ✅ Redirect to home
          this.router.navigate(['/home']);
        } else {
          alert('Login failed: Incorrect credentials');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Server error during login.');
      }
    });
  }
}