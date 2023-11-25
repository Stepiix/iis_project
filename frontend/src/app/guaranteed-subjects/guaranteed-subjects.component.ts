import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  } = {
    id: '',
    type: '',
    length: 0,
    week: '',
    subject_code: '',
  };
  aBlock:{
    teacher: string;
  } = {
    teacher: '',
  }
  currentActivity: {
    id: string;
    type: string;
    length: number;
    week: string;
    subject_code: string;
  } = {
    id: '',
    type: '',
    length: 0,
    week: '',
    subject_code: '',
  };
  currentActivityTeachers: any[] = [];
  tblocks: any[] = [];
  teacher_id: number =  0;

  activityInEditMode: boolean[] = [];
  subjectInEditMode: boolean[] = [];
  rooms: any[] = [];
  teachers: any[] = [];
  subjects: any[] = [];
  activities: any[] = [];
  subjectteachers: any[] = [];
  showSelectColumn: boolean = false;

  teachersMap: { [key: string]: string } = {};

  isFormVisible: boolean = false;
  addButtonText: string = "Add Activity";
  showAllSubjectsTable: boolean = false;
  showAllSubjectsButtonText: string = "See all my subjects";
  showAllActivitiesTable: boolean = false;
  showAllActivitiesButtonText: string = "See all activities"
  showSetActivities: boolean = false;
  showAblockButtonText: string = "Set activities"


  constructor(private authService: AuthorizationService, private router: Router, private usersService: UsersService,private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadMySubjects();
    if (this.authService.isAuthorized('teacher')) {
      console.log('ScheduleComponent initialized for authorized student.');
      this.loadTeachers();
      this.loadRooms();
      this.loadActivities();
      // this.getTeachersForSubjects();
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }
  helpLoadTeachers(){
    this.subjects.forEach(subject => {
      this.loadTeachersbySubject(subject.subject_code);
    });
  }
  loadTeachersbySubject(subjectCode: string): void {
    this.usersService.getTeachersForSubject(subjectCode)
      .subscribe((data: any) => {
        const teacherNames = data.records.map((teacher: any) => `${teacher.user_firstname} ${teacher.user_lastname}`).join(', ');
        this.teachersMap[subjectCode] = teacherNames;
      });
  }
  getTeacherNames(subjectCode: string): string {
    return this.teachersMap[subjectCode] || 'No teachers available';
  }
  showAblock(){
    this.showSetActivities = !this.showSetActivities;
    if(this.isFormVisible){
      this.isFormVisible = false;
      this.addButtonText = "Add Activity";
    }
    if(this.showAllSubjectsTable){
      this.showAllSubjectsTable = false;
      this.showAllSubjectsButtonText = "See all my subjects";
    }
    if(this.showAllActivitiesTable){
      this.showAllActivitiesTable = false;
      this.showAllActivitiesButtonText = "See all activities";
    }
    if(this.showSetActivities){
      this.showAblockButtonText = "Cancel"
    } else {
      this.showAblockButtonText = "Set activities"
    }

  }
  onSubmit() {
    if(!this.activity.length||!this.activity.subject_code||!this.activity.type||!this.activity.week){
      this.showCreatedAlert2();
      return;
    }
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
    console.log("tady jsem ja");
    this.usersService.getMySubjects(this.authService.getID()).subscribe((data: any) => {
      this.subjects = data.records;
      this.helpLoadTeachers();
    });
  }
  loadActivities(){
    this.usersService.getMyActivities(this.authService.getID()).subscribe((data: any) => {
      this.activities = data.records;

    });
  }
  addToSchedule(activity: any){
    this.usersService.getTeachersForSubject(activity.activity_subject_code).subscribe((data: any) => {
      this.currentActivityTeachers = data.records;
    });
    this.currentActivity.id = activity.activity_id;
    this.currentActivity.type = activity.activity_type;
    this.currentActivity.length = activity.activity_length;
    this.currentActivity.week = activity.activity_week;
    this.currentActivity.subject_code = activity.activity_subject_code;

    this.showAllActivitiesTable = false;
    this.showAllActivitiesButtonText = "See all activities";
    this.showSetActivities = true;
    this.showAblockButtonText = "Cancel"


  }

  onTeacherChange() {

  }



  showAllSubjects(){
    this.showAllSubjectsTable = !this.showAllSubjectsTable;
    if(this.isFormVisible){
      this.isFormVisible = false;
      this.addButtonText = "Add User"
    }
    if(this.showAllActivitiesTable){
      this.showAllActivitiesTable = false;
      this.showAllActivitiesButtonText = "See all activities";
    }
    if(this.showSetActivities){
      this.showSetActivities = false;
      this.showAblockButtonText = "Set activities";
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
    if(this.showAllActivitiesTable){
      this.showAllActivitiesTable = false;
      this.showAllActivitiesButtonText = "See all activities";
    }
    if(this.showSetActivities){
      this.showSetActivities = false;
      this.showAblockButtonText = "Set activities";
    }
    if (this.isFormVisible) {
      this.addButtonText = "Cancel";
    } else {
      this.addButtonText = "Add Activity";
    }
  }
  showAllActivities(){
    this.showAllActivitiesTable = !this.showAllActivitiesTable;
    if(this.isFormVisible){
      this.isFormVisible = false;
      this.addButtonText = "Add Activity";
    }
    if(this.showAllSubjectsTable){
      this.showAllSubjectsTable = false;
      this.showAllSubjectsButtonText = "See all my subjects";
    }
    if(this.showSetActivities){
      this.showSetActivities = false;
      this.showAblockButtonText = "Set activities";
    }
    if(this.showAllActivitiesTable){
      this.showAllActivitiesButtonText = "Cancel"
    } else {
      this.showAllActivitiesButtonText = "See all activities"
    }

  }
  deleteActivity(activity: any) {
    const confirmation = confirm(`Are you sure you want to delete activity you clicked on?`);
    if (confirmation) {
      this.usersService.deleteActivity(activity.activity_id).subscribe(() => this.loadActivities());
    }
  }
  endEditActivity(activity: any) {
    // Ukončit režim editace pro daného uživatele
    this.usersService.editSubject(activity).subscribe(() => this.loadActivities());
    this.activityInEditMode[activity.activity_id] = false;
//    this.cdr.detectChanges();
  }
  editActivity(activity: any) {
    console.log("editujeme ",activity.activity_id)
    // Nastavit režim editace pro daného uživatele

    this.activityInEditMode[activity.activity_id] = true;
    this.cdr.detectChanges();
  }
  endEditSubject(subject: any) {
    // Ukončit režim editace pro daného uživatele
    console.log("ahoj");
    this.usersService.addTeacher(subject.subject_code,this.aBlock.teacher).subscribe(() => this.loadMySubjects()); // zmenit aby 1 pridal teacher
    this.subjectInEditMode[subject.subject_code] = false;
  }
  editSubject(subject: any) {
    console.log("editujeme ",subject.subject_code)
    // Nastavit režim editace pro daného uživatele
    this.subjectInEditMode[subject.subject_code] = true;
    this.showSelectColumn = true;
    this.cdr.detectChanges();
  }
  addTeacher(){
    return;
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
  showCreatedAlert2() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'Je nutné zadat druh, délku, opakování a předmět ke kterému aktivita patří';
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

    // Automatické skrytí alertu po 2 sekundách (2000 ms)
    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }
}
