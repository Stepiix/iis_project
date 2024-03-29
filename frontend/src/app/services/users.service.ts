import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://www.stud.fit.vutbr.cz/~xpauli08/backend/api'
  // private apiUrl = 'http://localhost/iis_project/backend/api/'
  private apiUrlUsers = this.apiUrl.concat('/user');
  private apiUrlRooms = this.apiUrl.concat('/room');
  private apiUrlSubjects = this.apiUrl.concat('/subject');
  private apiUrlTBlocks = this.apiUrl.concat('/t_block');
  private apiUrlABlocks = this.apiUrl.concat('/a_block');
  private apiUrlActivity = this.apiUrl.concat('/activity');
  private apiUrlsubjectTeacher = this.apiUrl.concat('/subjectTeacher');

  constructor(private http: HttpClient) { }

  getUrlUsers() {
    return this.apiUrlUsers;
  }

  getUrlRooms() {
    return this.apiUrlRooms;
  }

  getUrlSubjects() {
    return this.apiUrlSubjects;
  }

  getUrlTBlocks() {
    return this.apiUrlTBlocks;
  }

  getUrlABlocks() {
    return this.apiUrlABlocks;
  }

  getUrlActivities() {
    return this.apiUrlActivity;
  }

  getUrlSubjectTeacher() {
    return this.apiUrlsubjectTeacher;
  }

  getUsers() {
    return this.http.get(`${this.apiUrlUsers}/getallusers.php`);
  }
  deleteUser(userId: number) {
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
  editActivity(activity: any){
    const url = `${this.apiUrlActivity}/edit.php`;
    const body = {
      type: activity.activity_type,
      length: activity.activity_length,
      week: activity.activity_week,
      subject_code: activity.activity_subject_code,
      id : activity.activity_id

    };

    return this.http.put(url, body);
  }
  getRooms() {
    return this.http.get(`${this.apiUrlRooms}/getAll.php`);
  }
  deleteRoom(roomCode: string) {
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
    return this.http.get(`${this.apiUrlSubjects}/getGuarantedSubjectsFromID.php?id=${user}`);
  }

  getTBlocks(user_id: number) {
    return this.http.post(`${this.apiUrlTBlocks}/getAllByUser.php`, {"user_id": user_id});
  }

  getABlocks(user_id: number) {
    return this.http.post(`${this.apiUrlABlocks}/getAllByUser.php`, {"user_id": user_id});
  }

  getMySchedule(user: any){
    return this.http.get(`${this.apiUrlABlocks}/getScheduleById.php?id=${user}`);
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

    const params = {
      subject_code: subject_code,
      user_id: teacher_user_id
    };

    return this.http.post(`${this.apiUrlsubjectTeacher}/create.php`, params);
  }
  getTeachersForSubject(subject_code: string){
    return this.http.get(`${this.apiUrlsubjectTeacher}/getTeacherBySubject.php?subject_code=${subject_code}`);
  }
  addSubjectToStudent(subject_code: string, student_id: string){
    const requestBody = {
      subject_code: subject_code,
      user_id: student_id,
    };
    return this.http.post(`${this.apiUrlSubjects}/addSubjecttoStudent.php`,requestBody);
  }
  giveMeMySubjects(userid: any) {
    return this.http.get(`${this.apiUrlSubjects}/getSubjectsthatStudentHave.php?user_id=${userid}`);
  }
  removeSubjectFromStudent(subject_code: string, student_id: string){
    return this.http.delete(`${this.apiUrlSubjects}/deleteSubjectFromStudent.php?subject_code=${subject_code}&user_id=${student_id}`);
  }
  loadAblocks(){
    return this.http.get(`${this.apiUrlABlocks}/getAll.php`);
  }
  confirmAblock(ablockID: any, roomCODE: any){
    const url = `${this.apiUrlABlocks}/confirmActivity.php`;
    const data = {
      a_block_id: ablockID,
      a_block_room_code: roomCODE
    };
    return this.http.put(url, data);
  }
  unconfirmAblock(ablockID:any){
    const url = `${this.apiUrlABlocks}/unconfirmActivity.php`;
    const data = {
      a_block_id: ablockID,
    };
    return this.http.put(url, data);

  }
  getBlockWeekInfo(aBlockId: any){
    return this.http.get(`${this.apiUrlABlocks}/getWeekOfActivity.php?a_block_id=${aBlockId}`);
  }

}
