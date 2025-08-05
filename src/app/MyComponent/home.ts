import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Welcome! {{ userName }}</h2>
      <p>🎯 You have access to the following platforms:</p>

      <div class="platform-box" *ngFor="let platform of platforms">
        <a [href]="platform.url" target="_blank">{{ platform.name }}</a>
      </div>

      <button class="logout-button" (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      padding: 40px;
    }

    .platform-box {
      margin: 15px auto;
      padding: 15px;
      width: 60%;
      border: 2px solid #007BFF;
      border-radius: 10px;
      background-color: #f1f9ff;
      font-size: 18px;
    }

    a {
      color: #007BFF;
      text-decoration: none;
      font-weight: bold;
    }

    .logout-button {
      margin-top: 30px;
      padding: 10px 30px;
      font-size: 16px;
      background-color: #ff4d4d;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }

    .logout-button:hover {
      background-color: #cc0000;
    }
  `]
})

export class HomeComponent {
  platforms: { name: string; url: string }[] = [];
  userName: string = '';

  constructor(private auth: AuthService, private router: Router) {
    const nid = localStorage.getItem('loggedInNID');

    if (nid) {
      // Fetch user name
      this.auth.getUserName(nid).subscribe({
        next: (response) => {
          this.userName = response.name;
        },
        error: () => {
          console.error("Failed to fetch user name.");
        }
      });

      // Fetch platforms
      this.auth.getPlatformsByNID(nid).subscribe({
        next: (data: any[]) => {
          this.platforms = data.map(p => ({
            name: p.name,
            url: p.url
          }));
        },
        error: (err) => {
          console.error("Error fetching platforms:", err);
        }
      });
    } else {
      alert("No user is logged in. Redirecting to login.");
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('loggedInNID');
    this.router.navigate(['/login']);
  }
}