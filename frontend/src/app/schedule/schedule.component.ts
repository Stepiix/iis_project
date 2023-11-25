import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  itIsRozvrhar:boolean=false;
  aBlocks:any[]=[];
  
  constructor(private authService: AuthorizationService, private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    // Use the authService to check authorization
    if(this.authService.getUserRole() === "rozvrhar"){
      this.itIsRozvrhar = true;
      console.log("rozvrhar")
    }
    if (this.authService.isAuthorized('student') || this.itIsRozvrhar) {
      // Add your initialization logic for authorized students here
      console.log('ScheduleComponent initialized for authorized student.');
      this.loadAblocks();
    } else {
      // Handle unauthorized access
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
      // Optionally, you can redirect to another route or show an unauthorized message.
    }
  }
  loadAblocks(){
    this.usersService.loadAblocks().subscribe((data: any) => {
    
    });
  }

}
