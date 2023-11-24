import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrlUsers = 'http://localhost/iis_project/backend/api/user';
  private apiUrlRooms = 'http://localhost/iis_project/backend/api/room';
  private apiUrlSubjects = 'http://localhost/iis_project/backend/api/subject';
  private apiUrlTBlocks = 'http://localhost/iis_project/backend/api/t_block';
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
      firstname: user.user_firstname,
      lastname: user.user_lastname,
      email: user.user_email,
      role: user.user_role
    };

    return this.http.put(url, body);
  }
  editRoom(room: any) {
    const url = `${this.apiUrlRooms}/edit.php`;
    const body = {
      code: room.room_code,
      capacity: room.room_capacity
    };

    return this.http.put(url, body);
  }
  editSubject(subject: any) {
    const url = `${this.apiUrlSubjects}/edit.php`;
    const body = {
      code: subject.subject_code,
      name: subject.subject_name,
      annotation: subject.subject_annotation,
      guarantor: subject.subject_guarantor
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
  getMySubjects(user: any){
    
    const url = `${this.apiUrlSubjects}/getGuarantedSubjectsFromID.php`;
    const body = {
      id: user.userID
    };
    return;
    // return this.http.get(url, body);
    
    // const userID = JSON.parse(user);
    // const userIDfinal = user.userID;
    // console.log(userIDfinal)
    // return this.http.get(`${this.apiUrlSubjects}/getGuarantedSubjectsFromID?id=${user.userID}`);
  }

  getTBlocks(user_id: number) {
    return this.http.post(`${this.apiUrlTBlocks}/getAllByUser.php`, {"user_id": user_id});
  }
}
