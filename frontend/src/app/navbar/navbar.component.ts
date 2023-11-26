import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpened1: boolean = false;
  isMenuOpened2: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
   }

  scheduleClick(): void {
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      this.router.navigate(['/schedule']);
    } else {
      this.showUnauthorizedAlert();
    }
  }
  toggleMenu1(): void {
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      const userRole = userData.userRole;
      if (userRole === "teacher" || userRole === "admin") {
        this.isMenuOpened1 = !this.isMenuOpened1;
      } else {
        this.showUnauthorizedAlert();
      }
    } else {
      this.showUnauthorizedAlert();
    }
  }

  toggleMenu2(): void {
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      const userRole = userData.userRole;
      if (userRole === "admin") {
        this.isMenuOpened2 = !this.isMenuOpened2;
      } else {
        this.showUnauthorizedAlert();
      }
    } else {
      this.showUnauthorizedAlert();
    }
  }


  clickedOutside1(): void {
    this.isMenuOpened1 = false;
  }

  clickedOutside2(): void {
    this.isMenuOpened2 = false;
  }


  signOut(): void {
    this.authService.logout();
  }

  isLogged() {
    return this.authService.isLoggedIn();
  }

  toggleSignInSignOut(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    } else {
       this.router.navigate(['/sign_in']);
    }
  }

  showUnauthorizedAlert() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'K tomuto nemáš přístup';
    welcomeAlert.style.position = 'fixed';
    welcomeAlert.style.top = '10%';
    welcomeAlert.style.left = '50%';
    welcomeAlert.style.transform = 'translate(-50%, -50%)';
    welcomeAlert.style.padding = '15px';
    welcomeAlert.style.width = '100%';
    welcomeAlert.style.background = '#FF6666';
    welcomeAlert.style.color = 'white';
    welcomeAlert.style.borderRadius = '5px';
    welcomeAlert.style.whiteSpace = 'nowrap';
    welcomeAlert.style.textAlign = 'center';
    document.body.appendChild(welcomeAlert);

    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }


}
