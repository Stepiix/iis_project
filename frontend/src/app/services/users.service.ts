import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrlUsers = 'http://localhost/iis_project/backend/api/user';
  private apiUrlRooms = 'http://localhost/iis_project/backend/api/room';
  private apiUrlSubjects = 'http://localhost/iis_project/backend/api/subject';
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get(`${this.apiUrlUsers}/getallusers.php`);
  }
  deleteUser(userId: number) {
    console.log("user id is ", userId);
    return this.http.delete(`${this.apiUrlUsers}/deleteuser.php?id=${userId}`);
  }
  editUser(user: any) {
    const url = `${this.apiUrlUsers}/edit.php`;
    const body = {
      id: user.user_id,
      user_firstname: user.user_firstname,
      user_lastname: user.user_lastname,
      user_email: user.user_email,
      user_role: user.user_role
    };

    return this.http.put(url, body);
  }
  getRooms() {
    return this.http.get(`${this.apiUrlRooms}/getAll.php`);
  }
  deleteRoom(roomCode: string) {
    console.log("room code je " + roomCode);
    return this.http.delete(`${this.apiUrlRooms}/delete.php?room_code=${roomCode}`);
  }
  getSubjects() {
    return this.http.get(`${this.apiUrlSubjects}/getAll.php`);
  }
  deleteSubject(subjectCode: string) {
    return this.http.delete(`${this.apiUrlSubjects}/delete.php?subject_code=${subjectCode}`);
  }

  getTeachers() {
    return this.http.get(`${this.apiUrlSubjects}/getTeachers.php`);
  }

}
