import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
    guarantor: 0,
  };
  teachers: any[] = [];
  subjects: any[] = [];
  subjectInEditMode: boolean[] = [];
  showAllSubjectsTable: boolean = false;
  showAllSubjectsButtonText: string = "See all subjects";
  isFormVisible: boolean = false;
  addButtonText: string = "Add Subjects";

  constructor(private authService: AuthorizationService, private router: Router, private http: HttpClient, private usersService: UsersService, private cdr: ChangeDetectorRef) {}

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
    if(this.isFormVisible){
      this.isFormVisible = false;
      this.addButtonText = "Add Subject"
    }
    if(this.showAllSubjectsTable) {
      this.showAllSubjectsButtonText = "Cancel";
    } else {
      this.showAllSubjectsButtonText = "See all subjects";
    }
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    if(this.showAllSubjectsTable){
      this.showAllSubjectsTable = false;
      this.showAllSubjectsButtonText = "See all subjects"
    }
    if (this.isFormVisible) {
      this.addButtonText = "Cancel";
    } else {
      this.addButtonText = "Add Subject";
    }
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
  onSubmit() {
    if(!this.subject.code){
      this.showCreatedAlert2();
      return;
    }
    this.isFormVisible = !this.isFormVisible;
    this.addButtonText = "Add Subject"
    this.showCreatedAlert();
    this.showAllSubjectsTable = true;
    this.showAllSubjectsButtonText = "Cancel";
    console.log("----------");
    console.log(this.subject);
    console.log("----------");
    this.http.post('http://localhost/iis_project/backend/api/subject/create.php', this.subject)
      .subscribe(
        (response) => {
          this.loadSubjects();
        },
        (error) => {
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
    this.usersService.editSubject(subject).subscribe(() => this.loadSubjects());
    this.subjectInEditMode[subject.subject_code] = false;
  }
  editSubject(room: any) {
    console.log("editujeme ",room.subject_code)
    this.subjectInEditMode[room.subject_code] = true;
    this.cdr.detectChanges();
  }
  showCreatedAlert() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'Subject vytvořen';
    welcomeAlert.style.position = 'fixed';
    welcomeAlert.style.top = '10%';
    welcomeAlert.style.left = '50%';
    welcomeAlert.style.transform = 'translate(-50%, -50%)';
    welcomeAlert.style.padding = '15px';
    welcomeAlert.style.width = '100%';
    welcomeAlert.style.background = '#00FF00';
    welcomeAlert.style.color = 'white';
    welcomeAlert.style.borderRadius = '5px';
    welcomeAlert.style.whiteSpace = 'nowrap';
    welcomeAlert.style.textAlign = 'center';
    document.body.appendChild(welcomeAlert);

    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }
  showCreatedAlert2() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'Je nutné zadat Subject code';
    welcomeAlert.style.position = 'fixed';
    welcomeAlert.style.top = '10%';
    welcomeAlert.style.left = '50%';
    welcomeAlert.style.transform = 'translate(-50%, -50%)';
    welcomeAlert.style.padding = '15px';
    welcomeAlert.style.width = '100%';
    welcomeAlert.style.background = '#FF0000';
    welcomeAlert.style.color = 'white';
    welcomeAlert.style.borderRadius = '5px';
    welcomeAlert.style.whiteSpace = 'nowrap';
    welcomeAlert.style.textAlign = 'center';
    document.body.appendChild(welcomeAlert);

    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }
}
