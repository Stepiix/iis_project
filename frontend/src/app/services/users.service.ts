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
  private apiUrlActivity = 'http://localhost/iis_project/backend/api/activity';
  private apiUrlsubjectTeacher = 'http://localhost/iis_project/backend/api/subjectTeacher';
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
    console.log("-------");
    console.log(user);
    console.log("-------");
    return this.http.get(`${this.apiUrlSubjects}/getGuarantedSubjectsFromID.php?id=${user}`);
  }

  getTBlocks(user_id: number) {
    return this.http.post(`${this.apiUrlTBlocks}/getAllByUser.php`, {"user_id": user_id});
  }
  getActivities(){
    return this.http.get(`${this.apiUrlActivity}/getAll.php`);
  }
  getMyActivities(user: any){
    return this.http.get(`${this.apiUrlActivity}/getAllByTeacher.php?id=${user}`);
  }
  deleteActivity(subjectCode: string) {
    return this.http.delete(`${this.apiUrlActivity}/delete.php?activity_id=${subjectCode}`);
  }
  addTeacher(subject_code: string, teacher_user_id: string) {
    console.log("----------");
    console.log("subjectcode: " + subject_code + " a user_id je " + teacher_user_id);
    console.log("----------");
  
    const params = {
      subject_code: subject_code,
      user_id: teacher_user_id
    };
  
    return this.http.post(`${this.apiUrlsubjectTeacher}/create.php`, params);
  }
  getTeachersForSubject(subject_code: string){
    console.log("----kokos--");
    console.log(subject_code);
    console.log("------");
    return this.http.get(`${this.apiUrlsubjectTeacher}/getTeacherBySubject.php?subject_code=${subject_code}`);
  }
}
