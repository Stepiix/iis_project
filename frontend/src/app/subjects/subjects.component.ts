import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit{
  subject: {
    code: string;
    name: string;
    annotation: string;
    guarantor: number;
  } = {
    code: '',
    name: '',
    annotation: '',
    guarantor: 0,
  };
  teachers: any[] = [];
  subjects: any[] = [];
  itIsStudent:boolean=false;

  constructor(private authService: AuthorizationService, private router: Router, private http: HttpClient, private usersService: UsersService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadTeachers();
    if(this.authService.getUserRole() === "student"){
      this.itIsStudent = true;
      console.log("Student")
    }
    this.knowWhatSubjectDoIAlreadyHave(this.authService.getID());
  }



  loadTeachers() {
    this.usersService.getTeachers().subscribe((data: any) => {
      this.teachers = data.records;
    });
  }
  getTeacherName(id: string) {
    let teacher = this.teachers.find(t => t.user_id == id);
    return teacher ? teacher.user_firstname + " " + teacher.user_lastname : 'undefined';
  }
  loadSubjects() {
    this.usersService.getSubjects().subscribe((data: any) => {
      this.subjects = data.records;
    });
  }
  addSubject(subject: any) {
    const studentId = this.authService.getID();
  
    if (studentId !== null) {
      this.usersService.addSubjectToStudent(subject, studentId).subscribe((data: any) => {
        // Handle the response data if needed
      });
    } else {
      console.error("Student ID is null");
      // Handle the case when student ID is null, depending on your requirements
    }
  }
  knowWhatSubjectDoIAlreadyHave(id: any){
    this.usersService.giveMeMySubjects(id).subscribe((data: any) => {
    });
  }




}




