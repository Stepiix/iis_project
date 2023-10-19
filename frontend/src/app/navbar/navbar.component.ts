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
    // Check user's login status when the component is created
  }

  toggleMenu1(): void {
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      const userRole = userData.userRole;
      if(userRole === "teacher" || userRole === "admin"){
        this.isMenuOpened1 = !this.isMenuOpened1;
      } 
    }
  }

  toggleMenu2(): void {
    this.isMenuOpened2 = !this.isMenuOpened2;
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
      // You can navigate to the login page or perform a login action here
      this.router.navigate(['/sign_in']);
    }
  }


}
