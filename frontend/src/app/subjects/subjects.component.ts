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

  constructor(private authService: AuthorizationService, private router: Router, private http: HttpClient, private usersService: UsersService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadTeachers();
  }



  loadTeachers() {
    this.usersService.getTeachers().subscribe((data: any) => {
      this.teachers = data.records;
    });
  }
  getTeacherName(id: string) {
    console.log(id);
    let teacher = this.teachers.find(t => t.user_id == id);
    return teacher ? teacher.user_firstname + " " + teacher.user_lastname : 'undefined';
  }
  loadSubjects() {
    this.usersService.getSubjects().subscribe((data: any) => {
      this.subjects = data.records;
    });
  }




}




