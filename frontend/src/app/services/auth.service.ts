import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  isAuthorized(role: string): boolean {
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      const userRole = userData.userRole;
      if (role === "student" && (userRole === "student" || userRole === "teacher" || userRole === "admin")) {
        return true;
      } else if (role === "teacher" && (userRole === "teacher" || userRole === "admin")) {
        return true;
      } else if (role === "admin" && userRole === "admin") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getID(): string | null {
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      return userData.userID || null;
    } else {
      return null;
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

    // Automatické skrytí alertu po 2 sekundách (2000 ms)
    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }
}
