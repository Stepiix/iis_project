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
  ablocks: any[] = [];
  teacher_id: number =  0;
  possiblePositions: any[] = [];
  selected_a_blocks: any[] = [];

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
      this.loadTeachers();
      this.loadRooms();
      this.loadActivities();
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
    this.showAllActivitiesTable = true;
    this.showAllActivitiesButtonText = "Cancel";
    this.http.post(this.usersService.getUrlActivities().concat('/create.php'), this.activity)
      .subscribe(
        (response) => {
          this.loadMySubjects();
          this.loadActivities();

        },
        (error) => {
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

  onTeacherChange(teacher: any) {
    this.teacher_id = teacher;

    this.usersService.getTBlocks(this.teacher_id).subscribe((tdata: any) => {
      this.tblocks = tdata.records;

      this.usersService.getABlocks(this.teacher_id).subscribe((adata: any) => {
        this.ablocks = adata.records;

        this.selected_a_blocks = this.ablocks.map((ablock) => {
          return {
            a_block_day: ablock.a_block_day,
            a_block_begin: ablock.a_block_begin,
            a_block_end: ablock.a_block_end,
            a_block_user_id: ablock.a_block_teacher,
            a_block_activity_id: ablock.a_block_activity_id,
          };
        });
      });

      const activityLength = this.currentActivity.length;
      this.possiblePositions = this.calculatePossiblePositions(this.tblocks, activityLength);

      this.cdr.detectChanges();
    });
  }

  calculatePossiblePositions(tBlocks: any[], activityLength: number): any[] {
    const possiblePositions: any[] = [];

    tBlocks.sort((a, b) => a.t_block_day.localeCompare(b.t_block_day) || a.t_block_begin - b.t_block_begin);

    for (let i = 0; i < tBlocks.length; i++) {
      let totalLength = 0;
      let endIndex = i;

      while (totalLength < activityLength && endIndex < tBlocks.length) {
        totalLength += tBlocks[endIndex].t_block_end - tBlocks[endIndex].t_block_begin;
        endIndex++;
      }

      if (totalLength >= activityLength) {
        const block1 = tBlocks[i];
        const block2 = tBlocks[endIndex - 1];

        const possiblePosition = {
          a_block_day: block1.t_block_day,
          a_block_begin: block1.t_block_begin,
          a_block_end: tBlocks[endIndex - 1].t_block_end,
          a_block_user_id: block1.t_block_user_id,
          a_block_activity_id: this.currentActivity.id,
        };

        if (possiblePosition.a_block_end - possiblePosition.a_block_begin == activityLength) {
          possiblePositions.push(possiblePosition);
        }
      }
    }

    possiblePositions.sort((a, b) => {
      const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const dayComparison = daysOrder.indexOf(a.a_block_day) - daysOrder.indexOf(b.a_block_day);

      if (dayComparison !== 0) {
        return dayComparison;
      }

      return a.a_block_begin - b.a_block_begin;
    });

    return possiblePositions;
  }

  toggleBlockSelection(position: any) {
    const index = this.selected_a_blocks.findIndex(
        (selectedBlock) =>
            selectedBlock.a_block_day === position.a_block_day &&
            selectedBlock.a_block_begin === position.a_block_begin &&
            selectedBlock.a_block_end === position.a_block_end &&
            selectedBlock.a_block_user_id === position.a_block_user_id &&
            selectedBlock.a_block_activity_id === position.a_block_activity_id
    );

    if (index === -1) {
      this.selected_a_blocks.push(position);
    } else {
      this.selected_a_blocks.splice(index, 1);
    }
  }


  isBlockSelected(position: any): boolean {
    const index = this.selected_a_blocks.findIndex(
        (selectedBlock) =>
            selectedBlock.a_block_day === position.a_block_day &&
            selectedBlock.a_block_begin === position.a_block_begin &&
            selectedBlock.a_block_end === position.a_block_end &&
            selectedBlock.a_block_user_id === position.a_block_user_id &&
            selectedBlock.a_block_activity_id === position.a_block_activity_id
    );

    return index !== -1;
  }

  saveSelectedBlocks() {
    const postData = this.selected_a_blocks.length > 0 ? this.selected_a_blocks : { user_id: this.teacher_id };
    this.showCreatedAlert3();
    this.http.post(this.usersService.getUrlABlocks().concat('/create-update.php'), postData)
        .subscribe(
            (response) => {

              this.loadSelectedABlocks();
            },
            (error) => {
              console.error(error);
            }
        );
  }

  loadSelectedABlocks() {
    this.usersService.getABlocks(this.teacher_id).subscribe((data: any) => {
      this.ablocks = data.records;
    });
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
    this.usersService.editActivity(activity).subscribe(() => this.loadActivities());
    this.activityInEditMode[activity.activity_id] = false;
  }
  editActivity(activity: any) {
    this.activityInEditMode[activity.activity_id] = true;
    this.activityInEditMode[activity.activity_id] = true;
    this.cdr.detectChanges();
  }
  endEditSubject(subject: any) {
    this.usersService.addTeacher(subject.subject_code,this.aBlock.teacher).subscribe(() => this.loadMySubjects()); // zmenit aby 1 pridal teacher
    this.subjectInEditMode[subject.subject_code] = false;
  }
  editSubject(subject: any) {
    this.subjectInEditMode[subject.subject_code] = true;
    this.showSelectColumn = true;
    this.cdr.detectChanges();
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

    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }
  showCreatedAlert3() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'Zadal jsi časy pro aktivitu';
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
}
