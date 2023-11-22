import { Component } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subjects-admin',
  templateUrl: './subjects-admin.component.html',
  styleUrls: ['./subjects-admin.component.css']
})
export class SubjectsAdminComponent {
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
