import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  user: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
  } = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: ''
  };
  users: any[] = [];
  userInEditMode: boolean[] = [];
  isFormVisible: boolean = false;
  addButtonText: string = "Add User";
  showAllUsersTable: boolean = false;
  showAllUsersButtonText: string = "See all users";


  constructor(private http: HttpClient, private usersService: UsersService, private authService: AuthorizationService, private router: Router, private auth: AuthService) {} // Inject UsersService

  ngOnInit(): void {
    this.loadUsers(); // Call a function to load users when the component initializes
    if (this.authService.isAuthorized('admin')) {
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }

  loadUsers() {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data.records;
    });
  }

  onSubmit() {
    if (!this.user.email || !this.user.password || !this.user.role) {
    this.showCreatedAlert2();
    return;
    }

    this.isFormVisible = !this.isFormVisible;
    this.addButtonText = "Add User";
    this.showCreatedAlert();
    this.showAllUsersTable = true;
    this.showAllUsersButtonText = "Cancel";
    this.http.post(this.usersService.getUrlUsers().concat('/create.php'), this.user)
      .subscribe(
        (response) => {
          // Handle a successful response from the server
          this.loadUsers(); // After user creation, refresh the user list
        },
        (error) => {
          // Handle errors here
          console.error(error);
        }
      );
  }

  deleteUser(user: any) {
    const confirmation = confirm(`Are you sure you want to delete ${user.user_firstname} ${user.user_lastname}?`);
    if (confirmation) {
      this.usersService.deleteUser(user.user_id).subscribe(() => this.loadUsers());
    }
  }

  editUser(user: any) {
    this.userInEditMode[user.user_id] = true;
  }
  endEditUser(user: any) {
    this.usersService.editUser(user).subscribe(() => this.loadUsers());
    this.userInEditMode[user.user_id] = false;
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    if(this.showAllUsersTable){
      this.showAllUsersTable = false;
      this.showAllUsersButtonText = "See all users"
    }
    if (this.isFormVisible) {
      this.addButtonText = "Cancel";
    } else {
      this.addButtonText = "Add User";
    }
  }
  showAllUsers(){
    this.showAllUsersTable = !this.showAllUsersTable;
    if(this.isFormVisible){
      this.isFormVisible = false;
      this.addButtonText = "Add User"
    }
    if(this.showAllUsersTable) {
      this.showAllUsersButtonText = "Cancel";
    } else {
      this.showAllUsersButtonText = "See all users";
    }
  }
  showCreatedAlert() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'User vytvořen';
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
    welcomeAlert.textContent = 'Je nutné zadat email, password a roli';
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
}
