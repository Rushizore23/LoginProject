
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp.html'
})
export class OtpComponent implements OnInit {
  otp: string = '';
  errorMessage: string = '';
  resendDisabled: boolean = true;
  countdown: number = 30;
  otpExpired: boolean = false;
  timer: any;
  redirectTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.startResendTimer();
    this.startRedirectTimer();
  }

  // ⏱ Start 30-second timer for OTP validity
  startResendTimer() {
    this.resendDisabled = true;
    this.countdown = 30;
    this.otpExpired = false;

    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.resendDisabled = false;
        this.otpExpired = true; // 🔥 Mark OTP as expired
        clearInterval(this.timer);
      }
    }, 1000);
  }

  // ⏱ Start 60-second session timeout
  startRedirectTimer() {
    this.redirectTimer = setTimeout(() => {
      alert('OTP expired. Redirecting to login.');
      this.router.navigate(['/login']);
    }, 60000);
  }

  // ✅ Validate OTP
  onValidateOTP() {
    const nid = localStorage.getItem('nid');
    if (!nid) {
      alert('No user is logged in. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }

    // 🚫 Reject if OTP expired
    if (this.otpExpired) {
      this.errorMessage = 'OTP has expired. Please click "Resend OTP".';
      return;
    }

    this.http.post<any>('https://localhost:7292/api/User/ValidateOTP', {
      nid,
      otp: this.otp
    }).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('loggedInNID', nid);
          // alert('OTP validated successfully.');
          clearTimeout(this.redirectTimer); // 🧹 Clear redirect
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.message || 'Invalid OTP.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Error validating OTP.';
        console.error(err);
      }
    });
  }

  // 🔁 Resend OTP and generate new one in DB
  resendOTP() {
    const nid = localStorage.getItem('nid');
    if (!nid) {
      alert('No user is logged in. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }

    this.http.post<any>('https://localhost:7292/api/User/Login', {
      nid,
      password: '' // 🔁 Password can be empty for resend logic
    }).subscribe({
      next: (response) => {
        if (response.success) {
          alert('New OTP has been sent.');
          this.startResendTimer(); // 🔄 Restart 30s timer
        } else {
          alert('Failed to resend OTP.');
        }
      },
      error: (err) => {
        console.error('Error resending OTP:', err);
        alert('Failed to resend OTP.');
      }
    });
  }
}
