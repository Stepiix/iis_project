import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  user: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
  } = { 
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('http://localhost/iis_project/backend/api/user/create.php', this.user)
      .subscribe(
        (response) => {
          // Handle a successful response from the server
          console.log(response);
        },
        (error) => {
          // Handle errors here
          console.error(error);
        }
      );
  }
}