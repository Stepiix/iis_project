import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}



  onSubmit() {
    console.log("Jsem v submit");
    this.http.post('http://localhost/iis_project/backend/api/user/login.php', this.user)
      .subscribe(
        (response) => {
          // Handle a successful response from the server
          console.log(response);
        },
        (error) => {
          // Handle errors here
//          console.error(error);
          console.log("chyba");
        }
      );
  }

}
