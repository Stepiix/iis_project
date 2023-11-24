import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-guaranteed-subjects',
  templateUrl: './guaranteed-subjects.component.html',
  styleUrls: ['./guaranteed-subjects.component.css']
})
export class GuaranteedSubjectsComponent implements OnInit{
  activity: {
    id: string;
    type: string;
    length: number;
    week: string;
    subject_code: string;
    teacher: string;
    room: string;
  } = {
    id: '',
    type: '',
    length: 0,
    week: '',
    subject_code: '',
    teacher: '',
    room: '',
  };
  rooms: any[] = [];
  teachers: any[] = [];
  subjects: any[] = [];
  showAllSubjectsTable: boolean = false;
  isFormVisible: boolean = false;
  addButtonText: string = "Add Activity";
  showAllSubjectsButtonText: string = "See all my subjects";
  showAllActivitiesButtonText: string = "See all activities"
  showAllActivitiesTable: boolean = false;

  constructor(private authService: AuthorizationService, private router: Router, private usersService: UsersService,private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMySubjects();
    if (this.authService.isAuthorized('teacher')) {
      console.log('ScheduleComponent initialized for authorized student.');
      this.loadTeachers();
      this.loadRooms();
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }
  onSubmit() {

    this.isFormVisible = !this.isFormVisible;
    this.addButtonText = "Add Activity";
    this.showCreatedAlert();
    this.showAllSubjectsTable = true;
    this.showAllSubjectsButtonText = "Cancel";
    console.log("--------------")
    console.log(this.activity)
    console.log("--------------")
    this.http.post('http://localhost/iis_project/backend/api/activity/create.php', this.activity)
      .subscribe(
        (response) => {
          // Handle a successful response from the server
          console.log(response);
          this.loadMySubjects(); // After user creation, refresh the user list
        },
        (error) => {
          // Handle errors here
          console.error(error);
        }
      );
  }
  loadTeachers() {
    this.usersService.getTeachers().subscribe((data: any) => {
      this.teachers = data.records;
    });
  }
  loadRooms() {
    this.usersService.getRooms().subscribe((data: any) => {
      this.rooms = data.records;
    });
  }
  loadMySubjects() {
    this.usersService.getMySubjects(this.authService.getID()).subscribe((data: any) => {
      this.subjects = data.records;
    });
  }
  showAllSubjects(){
    this.showAllSubjectsTable = !this.showAllSubjectsTable;
    if(this.isFormVisible){
      this.isFormVisible = false;
      this.addButtonText = "Add User"
    }
    if(this.showAllSubjectsTable) {
      this.showAllSubjectsButtonText = "Cancel";
    } else {
      this.showAllSubjectsButtonText = "See all my subjects";
    }
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    if(this.showAllSubjectsTable){
      this.showAllSubjectsTable = false;
      this.showAllSubjectsButtonText = "See all my subjects"
    }
    if (this.isFormVisible) {
      this.addButtonText = "Cancel";
    } else {
      this.addButtonText = "Add Activity";
    }
  }
  showAllActivities(){
    this.showAllActivitiesTable = !this.showAllActivitiesTable;

  }
  showCreatedAlert() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'Activita vytvořena';
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

    // Automatické skrytí alertu po 2 sekundách (2000 ms)
    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }
}
