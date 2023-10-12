import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost/iis_project/backend/api/user'; // Změňte URL na vaši API
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(`${this.apiUrl}/getallusers.php`);
  }
  deleteUser(userId: number) {
    console.log("user id is ",userId);
    return this.http.delete(`${this.apiUrl}/deleteuser.php?id=${userId}`);
  }

}
