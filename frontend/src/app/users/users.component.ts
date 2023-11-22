import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';

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


  constructor(private http: HttpClient, private usersService: UsersService, private authService: AuthorizationService, private router: Router) {} // Inject UsersService

  ngOnInit(): void {
    this.loadUsers(); // Call a function to load users when the component initializes
    if (this.authService.isAuthorized('admin')) {
      console.log('ScheduleComponent initialized for authorized student.');
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
    console.log("studentova role je ",this.user.role);
    this.http.post('http://localhost/iis_project/backend/api/user/create.php', this.user)
      .subscribe(
        (response) => {
          // Handle a successful response from the server
          console.log(response);
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
      console.log(user.user_id);
      this.usersService.deleteUser(user.user_id).subscribe(() => this.loadUsers());
    }
  }

  editUser(user: any) {
    console.log("editujeme ",user.user_id)
    // Nastavit režim editace pro daného uživatele
    this.userInEditMode[user.user_id] = true;
  }
  endEditUser(user: any) {
    // Ukončit režim editace pro daného uživatele
    this.userInEditMode[user.user_id] = false;
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    if (this.isFormVisible) {
      this.addButtonText = "Cancel";
    } else {
      this.addButtonText = "Add User";
    }
  }
  showAllUsers(){
    this.showAllUsersTable = !this.showAllUsersTable;
    if(this.showAllUsersTable) {
      this.showAllUsersButtonText = "Cancel";
    } else {
      this.showAllUsersButtonText = "See all users";
    }
  }
}