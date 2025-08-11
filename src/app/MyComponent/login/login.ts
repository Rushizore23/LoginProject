import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  // 🟢 Login model object
  loginObj = {
    nid: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  // 🟢 Login function triggered on form submit
  onLogin() {
    const nidPattern = /^N\d{5}$/;

    // 🔴 Validation: All fields required
    if (!this.loginObj.nid || !this.loginObj.password) {
      alert('Please enter login details.');
      return;
    }

    // 🔴 Validation: NID format
    if (!nidPattern.test(this.loginObj.nid)) {
      alert('Please enter correct details');
      return;
    }

    // 🟢 API call to backend login endpoint
    this.http.post<any>('https://localhost:7292/api/User/Login', this.loginObj).subscribe({
      next: (response) => {
        console.log("✅ Backend Login Response:", response);

        // 🟢 Check if login was successful and OTP was generated
        if (response.success) {
          // alert('Login successful. Please enter the OTP.');

          // 🟢 Store NID in localStorage to use in OTP page
          localStorage.setItem('nid', this.loginObj.nid);

          // 🟢 Navigate to OTP component
          this.router.navigate(['/otp']);
        } else {
          // 🔴 Show backend-provided failure reason
          alert('Login failed: ' + response.message);
        }
      },
      error: (err) => {
        console.error('❌ Login error:', err);
        alert('Server error during login. Please try again.');
      }
    });
  }
}
