import { Component } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-free-time',
  templateUrl: './set-free-time.component.html',
  styleUrls: ['./set-free-time.component.css']
})
export class SetFreeTimeComponent {
  constructor(private authService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    // Use the authService to check authorization
    if (this.authService.isAuthorized('teacher')) {
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
