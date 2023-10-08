import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  user: { name: string } = { name: '' };
  
  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('http://your-backend-url/api/save-user.php', this.user)
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
