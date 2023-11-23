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
    this.isFormVisible = !this.isFormVisible;
    this.addButtonText = "Add Room";
    this.showCreatedAlert();
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
    if(this.showAllRoomsTable){
      this.showAllRoomsTable = false;
      this.showAllRoomsButtonText = "See all rooms"
    }
    if (this.isFormVisible) {
      this.addButtonText = "Cancel";
    } else {
      this.addButtonText = "Add Room";
    }
  }
  showAllRooms(){
    this.showAllRoomsTable = !this.showAllRoomsTable;
    if(this.isFormVisible){
      this.isFormVisible = false;
      this.addButtonText = "Add Room"
    }
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
    this.usersService.editRoom(room).subscribe(() => this.loadRooms());
    this.roomInEditMode[room.room_code] = false;
  }
  editRoom(room: any) {
    console.log("editujeme ",room.room_code)
    // Nastavit režim editace pro daného uživatele
    this.roomInEditMode[room.room_code] = true;
  }
  showCreatedAlert() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'Room vytvořen';
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

    // Automatické skrytí alertu po 2 sekundách (2000 ms)
    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }
}
