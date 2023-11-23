import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-subjects-admin',
  templateUrl: './subjects-admin.component.html',
  styleUrls: ['./subjects-admin.component.css']
})
export class SubjectsAdminComponent implements OnInit{
  subject: {
    subject_code: string;
    subject_name: string;
    subject_annotation: string;
    subject_garantor: string;
  } = { 
    subject_code: '',
    subject_name: '',
    subject_annotation: '',
    subject_garantor: '',
  };
  subjects: any[] = [];
  showAllSubjectsTable: boolean = false;
  showAllSubjectsButtonText: string = "See all subjects";
  isFormVisible: boolean = false;
  addButtonText: string = "Add Subjects";

  constructor(private authService: AuthorizationService, private router: Router, private http: HttpClient, private usersService: UsersService) {}

  ngOnInit(): void {
    if (this.authService.isAuthorized('admin')) {
      console.log('ScheduleComponent initialized for authorized student.');
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }
  showAllSubjects(){
    this.showAllSubjectsTable = !this.showAllSubjectsTable;
    if(this.showAllSubjectsTable) {
      this.showAllSubjectsButtonText = "Cancel";
    } else {
      this.showAllSubjectsButtonText = "See all subjects";
    }
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    if (this.isFormVisible) {
      this.addButtonText = "Cancel";
    } else {
      this.addButtonText = "Add Subject";
    }
  }
  loadSubjects() {
    this.usersService.getSubjects().subscribe((data: any) => {
      this.subjects = data.records;
    });
  }
  onSubmit() {
    this.http.post('http://localhost/iis_project/backend/api/subject/create.php', this.subject)
      .subscribe(
        (response) => {
          // Handle a successful response from the server
          console.log(response);
          this.loadSubjects(); // After user creation, refresh the user list
        },
        (error) => {
          // Handle errors here
          console.error(error);
        }
      );
  }
}
