import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  itIsRozvrhar:boolean=false;

  constructor(private authService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    // Use the authService to check authorization
    if(this.authService.getUserRole() === "rozvrhar"){
      this.itIsRozvrhar = true;
      console.log("rozvrhar")
    }
    if (this.authService.isAuthorized('student') || this.itIsRozvrhar) {
      // Add your initialization logic for authorized students here
      console.log('ScheduleComponent initialized for authorized student.');
    } else {
      // Handle unauthorized access
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
      // Optionally, you can redirect to another route or show an unauthorized message.
    }
  }
}
