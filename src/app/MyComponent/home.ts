import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  platforms: { name: string; url: string; imageName: string }[] = [];
  userName: string = '';

  constructor(private auth: AuthService, private router: Router) {
    const nid = localStorage.getItem('loggedInNID');

    if (nid) {
      // Fetch username
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
        this.platforms = data.map(p => {
          // Convert platform name to lowercase, replace spaces, and add '-img.jpg'
          const formattedName = p.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-'); // Replace spaces with '-'

          return {
            name: p.name,
            url: p.url,
            imageName: `${formattedName}-img.jpg` // e.g., youtube-img.jpg
          };
        });
      },
      error: (err) => {
        console.error("Error fetching platforms:", err);
      }
    });
  }
  }

  /*openPlatform(url: string) {
    window.open(url, '_blank');
  }*/

  logout() {
    localStorage.removeItem('loggedInNID');
    this.router.navigate(['/login']);
  }
  // ✅ Image fallback handler
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/default-platform.jpg';
  }
}
