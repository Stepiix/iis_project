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
    code: string;
    name: string;
    annotation: string;
    guarantor: number;
  } = {
    code: '',
    name: '',
    annotation: '',
    guarantor: 54,
  };
  teachers: any[] = [];
  subjects: any[] = [];
  subjectInEditMode: boolean[] = [];
  showAllSubjectsTable: boolean = false;
  showAllSubjectsButtonText: string = "See all subjects";
  isFormVisible: boolean = false;
  addButtonText: string = "Add Subjects";

  constructor(private authService: AuthorizationService, private router: Router, private http: HttpClient, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadSubjects();
    if (this.authService.isAuthorized('admin')) {
      console.log('ScheduleComponent initialized for authorized student.');
      this.loadTeachers();
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

  loadTeachers() {
    this.usersService.getTeachers().subscribe((data: any) => {
      this.teachers = data.records;
      console.log(this.teachers);
    });
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
  deleteSubject(subject: any) {
    const confirmation = confirm(`Are you sure you want to delete ${subject.subject_code}`);
    if (confirmation) {
      this.usersService.deleteSubject(subject.subject_code).subscribe(() => this.loadSubjects());
    }
  }
  endEditSubject(subject: any) {
    // Ukončit režim editace pro daného uživatele
    this.subjectInEditMode[subject.subject_code] = false;
  }
  editSubject(room: any) {
    console.log("editujeme ",room.subject_code)
    // Nastavit režim editace pro daného uživatele
    this.subjectInEditMode[room.subject_code] = true;
  }
}
