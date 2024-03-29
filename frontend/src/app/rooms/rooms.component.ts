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
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
    }
  }
  loadRooms() {
    this.usersService.getRooms().subscribe((data: any) => {
      this.rooms = data.records;
    });
  }
  onSubmit() {
    if(!this.room.code){
      this.showCreatedAlert2();
      return;
    }

    this.isFormVisible = !this.isFormVisible;
    this.addButtonText = "Add Room";
    this.showCreatedAlert();
    this.showAllRoomsTable = true;
    this.showAllRoomsButtonText = "Cancel";
    this.http.post(this.usersService.getUrlRooms().concat('/create.php'), this.room)
      .subscribe(
        (response) => {
          this.loadRooms();
        },
        (error) => {
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
    this.usersService.editRoom(room).subscribe(() => this.loadRooms());
    this.roomInEditMode[room.room_code] = false;
  }
  editRoom(room: any) {
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

    window.setTimeout(() => {
      welcomeAlert.style.display = 'none';
    }, 2000);
  }
  showCreatedAlert2() {
    const welcomeAlert = document.createElement('div');
    welcomeAlert.textContent = 'Je nutné zadat Room code';
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
