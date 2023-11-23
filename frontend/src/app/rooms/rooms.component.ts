import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{
  room: {
    code: string;
    capacity: number;
  } = { 
    code: '',
    capacity: 0,
  };
  rooms: any[] = [];
  roomInEditMode: boolean[] = [];
  isFormVisible: boolean = false;
  addButtonText: string = "Add Room";
  showAllRoomsTable: boolean = false;
  showAllRoomsButtonText: string = "See all rooms";


  constructor(private authService: AuthorizationService, private router: Router, private http: HttpClient, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadRooms();
    if (this.authService.isAuthorized('admin')) {
      console.log('ScheduleComponent initialized for authorized student.');
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }
  loadRooms() {
    this.usersService.getRooms().subscribe((data: any) => {
      console.log(data.records);
      this.rooms = data.records;
    });
  }
  onSubmit() {
    this.http.post('http://localhost/iis_project/backend/api/room/create.php', this.room)
      .subscribe(
        (response) => {
          // Handle a successful response from the server
          console.log(response);
          this.loadRooms(); // After user creation, refresh the user list
        },
        (error) => {
          // Handle errors here
          console.error(error);
        }
      );
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
    if (this.isFormVisible) {
      this.addButtonText = "Cancel";
    } else {
      this.addButtonText = "Add Room";
    }
  }
  showAllRooms(){
    this.showAllRoomsTable = !this.showAllRoomsTable;
    if(this.showAllRoomsTable) {
      this.showAllRoomsButtonText = "Cancel";
    } else {
      this.showAllRoomsButtonText = "See all rooms";
    }
  }
  deleteRoom(room: any) {
    const confirmation = confirm(`Are you sure you want to delete ${room.room_code}?`);
    if (confirmation) {
      this.usersService.deleteRoom(room.room_code).subscribe(() => this.loadRooms());
    }
  }
  endEditRoom(room: any) {
    // Ukončit režim editace pro daného uživatele
    this.roomInEditMode[room.room_code] = false;
  }
  editRoom(room: any) {
    console.log("editujeme ",room.room_code)
    // Nastavit režim editace pro daného uživatele
    this.roomInEditMode[room.room_code] = true;
  }
}
