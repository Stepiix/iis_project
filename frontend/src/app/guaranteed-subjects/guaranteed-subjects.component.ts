import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-guaranteed-subjects',
  templateUrl: './guaranteed-subjects.component.html',
  styleUrls: ['./guaranteed-subjects.component.css']
})
export class GuaranteedSubjectsComponent implements OnInit{
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
  subjects: any[] = [];

  constructor(private authService: AuthorizationService, private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadMySubjects();
    if (this.authService.isAuthorized('teacher')) {
      console.log('ScheduleComponent initialized for authorized student.');
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }
  loadMySubjects() {
    console.log("kokutek");
    console.log(sessionStorage.getItem('userSession'))
    console.log("-------------")
    this.usersService.getMySubjects(sessionStorage.getItem('userSession')).subscribe((data: any) => {
      this.subjects = data.records;
    });
  }
}
