import { ChangeDetectorRef } from '@angular/core';
import { Component, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-set-free-time',
  templateUrl: './set-free-time.component.html',
  styleUrls: ['./set-free-time.component.css']
})
export class SetFreeTimeComponent {

  tblocks: any[] = [];
  user_id: number =  0;
  dataLoaded: boolean = false;

  constructor(private http: HttpClient, private usersService: UsersService, private authService: AuthorizationService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Use the authService to check authorization
    if (this.authService.isAuthorized('teacher')) {
      // Add your initialization logic for authorized students here
      console.log('ScheduleComponent initialized for authorized student.');
      const sessionData = sessionStorage.getItem('userSession');
      if (sessionData) {
        const userData = JSON.parse(sessionData);
        this.user_id = userData.userID;
      }

      this.usersService.getTBlocks(this.user_id).subscribe((data: any) => {
        this.tblocks = data.records;

        // Now, you can safely proceed with the rest of the initialization logic
        this.loadSelectedTimes();

        this.selectedTimes = this.tblocks.map(time => {
          return {
            key: `${time.t_block_day}-${time.t_block_begin}`,
            day: time.t_block_day,
            start: time.t_block_begin,
            end: time.t_block_end,
            user_id: time.t_block_user_id
          };
        });

        this.dataLoaded = true;
      });

    } else {
      // Handle unauthorized access
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
      // Optionally, you can redirect to another route or show an unauthorized message.
    }
  }

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  selectedTimes: any[] = [];

  toggleTime(dayIndex: number, hour: number) {
    const key = `${this.daysOfWeek[dayIndex]}-${hour}`;
    const existingIndex = this.selectedTimes.findIndex(time => time.key === key);

    if (existingIndex !== -1) {
      // If the time exists, remove it from the array
      this.selectedTimes.splice(existingIndex, 1);
    } else {
      // If the time doesn't exist, add it to the array with a unique key
      this.selectedTimes.push({ key, day: this.daysOfWeek[dayIndex], start: hour, end: hour + 1, user_id: this.user_id });
    }

    this.cdr.detectChanges();
  }

  loadSelectedTimes() {
    this.usersService.getTBlocks(this.user_id).subscribe((data: any) => {
      this.tblocks = data.records;
    });
  }

  onSave() {
    console.log(this.selectedTimes);

    const postData = this.selectedTimes.length > 0 ? this.selectedTimes : { user_id: this.user_id };

    this.http.post('http://localhost/iis_project/backend/api/t_block/create-update.php', postData)
      .subscribe(
        (response) => {
          // Handle a successful response from the server
          console.log(response);
          this.loadSelectedTimes(); // After user creation, refresh the user list
        },
        (error) => {
          // Handle errors here
          console.error(error);
        }
      );
  }

  getSelectableHours(): number[] {
    // Vrací pole hodin od 7 do 20
    return Array.from({ length: 14 }).map((_, index) => index + 7);
  }

  isSelected(dayIndex: number, hour: number): boolean {
    const key = `${this.daysOfWeek[dayIndex]}-${hour}`;
    return this.selectedTimes.some(time => time.key === key);
  }

  isHourSelectedInTBlocks(day: string, hour: number): boolean {
    if (!this.dataLoaded) {
      return false;
    }

    const key = `${day}-${hour}`;
    const isSelectedInTBlocks = this.tblocks.some(time => time.t_block_day === day && time.t_block_begin === hour);
    const isSelectedInSelectedTimes = this.selectedTimes.some(time => time.key === key);

    return isSelectedInTBlocks && isSelectedInSelectedTimes;
  }
}
