import { Component } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
  constructor(private authService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthorized('admin')) {
      console.log('ScheduleComponent initialized for authorized student.');
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }
}
