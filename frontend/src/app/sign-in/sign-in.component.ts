import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }



  onSubmit() {
    this.http.post('http://localhost/iis_project/backend/api/user/login.php', this.user)
  .subscribe({
    next: (response: any) => {
      // Handle a successful response from the server
      console.log("Úspěšné přihlášení:", response);
      const message = response.message;
      const userRole = response.userRole;
      const userID = response.userID;

      if (userRole === 'student') {
        console.log("je to student");
        console.log("ID studenta je " + userID);
        // Uživatel je student
        // Provádějte akce pro studenta
        this.startUserSession(userID, 'student');
      } else if (userRole === 'teacher') {
        console.log("");
        // Uživatel je učitel
        // Provádějte akce pro učitele
        this.startUserSession(userID, 'teacher');
      }
      this.router.navigate(['/']);
      this.auth.login();

      // Zde můžete provádět další kroky na základě response
    },
    error: (error: any) => {
      // Handle errors here
      console.log("Chyba při přihlášení:", error);
    }
  });

  }

  startUserSession(userID: string, userRole: string) {
    // Uložení informací o relaci do localStorage nebo jiného úložiště
    const sessionData = {
      userID: userID,
      userRole: userRole,
      expirationTime: new Date().getTime() + 10 * 60 * 1000 // 10 minut
    };
  
    sessionStorage.setItem('userSession', JSON.stringify(sessionData));
  
    // Další kroky, jako přesměrování na stránku po přihlášení atd.
  }

}
