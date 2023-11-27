import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {


  user: {
    email: string;
    password: string;
  } = {
      email: '',
      password: ''
    };

  users: any[] = [];
  loginUrl: string = "";
  constructor(private http: HttpClient, private router: Router, private auth: AuthService, private usersService: UsersService) { }



  onSubmit() {

    this.loginUrl = this.usersService.getUrlUsers();

    this.http.post(this.loginUrl.concat('/login.php'), this.user)
  .subscribe({
    next: (response: any) => {
      console.log("Úspěšné přihlášení:", response);
      const message = response.message;
      const userRole = response.userRole;
      const userID = response.userID;

      if (userRole === 'student') {
        this.startUserSession(userID, 'student');
      } else if (userRole === 'teacher') {
        this.startUserSession(userID, 'teacher');
      } else if(userRole === "admin") {
        this.startUserSession(userID, 'admin');
      } else if(userRole === "rozvrhar") {
        this.startUserSession(userID, 'rozvrhar');
      }
      console.log("Je to " + userRole);
      this.router.navigate(['/']);
      this.auth.login();
      this.showWelcomeAlert();

    },
    error: (error: any) => {
      console.log("Chyba při přihlášení:", error);
      alert("Zadal jste špatné jméno nebo heslo");
    }
  });
  }

  startUserSession(userID: string, userRole: string) {
     const sessionData = {
      userID: userID,
      userRole: userRole,
      expirationTime: new Date().getTime() + 10 * 60 * 1000
    };

    sessionStorage.setItem('userSession', JSON.stringify(sessionData));

  }

  showWelcomeAlert() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'Vítejte';
    welcomeAlert.style.position = 'fixed';
    welcomeAlert.style.top = '20%';
    welcomeAlert.style.left = '50%';
    welcomeAlert.style.transform = 'translate(-50%, -50%)';
    welcomeAlert.style.padding = '15px 100%';
    welcomeAlert.style.background = '#4CAF50';
    welcomeAlert.style.color = 'white';
    welcomeAlert.style.borderRadius = '5px';
    document.body.appendChild(welcomeAlert);


    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }

}
