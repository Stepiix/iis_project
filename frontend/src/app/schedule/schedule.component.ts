import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-schedule', 
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  itIsRozvrhar:boolean=false;
  originalAblocks: any[] = [];
  aBlocks: any[] = [];
  teachers: any[] = [];
  rooms: any[] = [];
  colorMap: { [key: number]: string } = {};
  selectedRooms: { [blockId: number]: string } = {};

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
      this.loadTeachers();
      this.loadRooms();
    } else {
      // Handle unauthorized access
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
      // Optionally, you can redirect to another route or show an unauthorized message.
    }
  }
  loadRooms(){
    this.usersService.getRooms().subscribe((data: any) => {
      this.rooms = data.records;
      console.log("=========")
      console.log(this.rooms)
      console.log("=========")
    });
  }
  loadAblocks(){
    this.usersService.loadAblocks().subscribe((data: any) => {
      this.originalAblocks = data.records;
      this.aBlocks = [...this.originalAblocks];  // Zkopírujte neseřazené ablocky do aktuálního pole
      console.log("---------")
      console.log(this.aBlocks)
      console.log("---------")
    });
  }
  loadTeachers(){
    this.usersService.getTeachers().subscribe((data: any) => {
      this.teachers = data.records;
      console.log("---------")
      console.log(this.teachers)
      console.log("---------")
    });
  }
  getTeacherName(teacherId: number): string {
    const teacher = this.teachers.find(t => t.user_id === teacherId);
    return teacher ? `${teacher.user_firstname} ${teacher.user_lastname}` : 'Neznámý učitel';
  }
  sortAblocksByDay() {
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    this.aBlocks.sort((a, b) => {
      return daysOrder.indexOf(a.a_block_day) - daysOrder.indexOf(b.a_block_day);
    });
  }
  getColorForBlock(block: any): string {
    if (!this.colorMap[block.a_block_activity_id]) {
      // Pokud pro toto ID ještě není přiřazena barva, přiřaďte novou barvu
      this.colorMap[block.a_block_activity_id] = this.getRandomColor();
    }
    return this.colorMap[block.a_block_activity_id];
  }
  getRandomColor(): string {
    // Generování náhodné barvy, můžete to nahradit vlastní logikou
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  onRoomChange(block: any, selectedRoom: string) {
    // Aktualizujte místnost v bloku podle výběru
    block.a_block_room = selectedRoom;
  }
  saveRoom(block: any) {
    // Zde implementujte akce pro uložení změn v místnosti pro konkrétní blok
    console.log(`Uložení změn pro blok ${block.a_block_id}, vybraná místnost: ${this.selectedRooms[block.a_block_id]}`);
    // Toto může zahrnovat volání služby pro uložení dat na serveru nebo jiné potřebné kroky.
  }

}
