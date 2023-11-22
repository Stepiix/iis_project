import { Component } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-guaranteed-subjects',
  templateUrl: './guaranteed-subjects.component.html',
  styleUrls: ['./guaranteed-subjects.component.css']
})
export class GuaranteedSubjectsComponent {
  constructor(private authService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthorized('teacher')) {
      console.log('ScheduleComponent initialized for authorized student.');
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }
}
