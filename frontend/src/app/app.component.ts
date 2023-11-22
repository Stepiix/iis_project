import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthorizationService) {}
  // isauthorized(role: string) {
  //   const sessionData = sessionStorage.getItem('userSession');
  //   if (sessionData) {
  //     const userData = JSON.parse(sessionData);
  //     const userRole = userData.userRole;
  //     if (role === "student" && (userRole === "student" || userRole === "teacher" || userRole === "admin")) {
  //       return true;
  //     } else if (role === "teacher" && (userRole === "teacher" || userRole === "admin")) {
  //       return true;
  //     } else if (role === "admin" && userRole === "admin") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }
}
