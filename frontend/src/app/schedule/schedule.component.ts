import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { forkJoin } from 'rxjs';
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
    if(this.authService.getUserRole() === "rozvrhar"){
      this.itIsRozvrhar = true;
      console.log("rozvrhar")
    }
    if (this.authService.isAuthorized('student') || this.itIsRozvrhar) {
      console.log('ScheduleComponent initialized for authorized student.');
      this.loadAblocks();
      this.loadTeachers();
      this.loadRooms();
    } else {
      this.router.navigate(['/']);
      this.authService.showUnauthorizedAlert();
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
  loadAblocks() {
    this.usersService.loadAblocks().subscribe((data: any) => {
      this.originalAblocks = data.records;

      // For each block, make a separate request to get activity_week
      forkJoin(
        this.originalAblocks.map(block => this.usersService.getBlockWeekInfo(block.a_block_id))
      ).subscribe((weekInfos: any[]) => {
        // Combine the activity_week with the original blocks
        this.aBlocks = this.originalAblocks.map((block, index) => ({
          ...block,
          weekInfo: weekInfos[index]
        }));

        console.log("---------");
        console.log(this.aBlocks);
        console.log("---------");
      });
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
      this.colorMap[block.a_block_activity_id] = this.getRandomColor();
    }
    return this.colorMap[block.a_block_activity_id];
  }
  getRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  onRoomChange(block: any, selectedRoom: string) {
    block.a_block_room = selectedRoom;
  }
  saveRoom(block: any) {
    if (block.a_block_confirmed === 0) {
      const teacherId = block.a_block_teacher;
      const beginTime = block.a_block_begin;
      const endTime = block.a_block_end;
      const roomCode = this.selectedRooms[block.a_block_id];
  
      const isTeacherAvailable = this.isTeacherAvailable(teacherId, block.a_block_day, beginTime, endTime);
      const isRoomAvailable = this.isRoomAvailable(block.a_block_day, beginTime, endTime, roomCode);
  
      if (isTeacherAvailable && isRoomAvailable) {
        console.log(`Uložení změn pro blok ${block.a_block_id}, vybraná místnost: ${roomCode}`);
        this.usersService.confirmAblock(block.a_block_id, roomCode).subscribe((data: any) => {
          this.loadAblocks();
        });
      } else {
        console.log('Učitel nebo místnost není dostupný v tomto čase nebo je překrytý jiným blokem.');
      }
    }
  }
  hasConfirmedBlockWithActivityId(activityId: number): boolean {
  return this.aBlocks.some(block => block.a_block_confirmed === 1 && block.a_block_activity_id === activityId);
}
  canSaveBlock(block: any): boolean {
  
    const teacherId = block.a_block_teacher;
    const beginTime = block.a_block_begin;
    const endTime = block.a_block_end;
    const roomCode = this.selectedRooms[block.a_block_id];
  
    const isTeacherAvailable = this.isTeacherAvailable(teacherId, block.a_block_day, beginTime, endTime);
    const isRoomAvailable = this.isRoomAvailable(block.a_block_day, beginTime, endTime, roomCode);
  
    return isTeacherAvailable && isRoomAvailable;
  }
  isTeacherAvailable(teacherId: number, day: string, beginTime: number, endTime: number): boolean {
    const teacherBlocks = this.aBlocks.filter(block => 
      block.a_block_teacher === teacherId &&
      block.a_block_confirmed === 1 &&
      block.a_block_day === day
    );
  
    const isAvailable = !teacherBlocks.some(existingBlock =>
      (beginTime >= existingBlock.a_block_begin && beginTime < existingBlock.a_block_end) ||
      (endTime > existingBlock.a_block_begin && endTime <= existingBlock.a_block_end) ||
      (beginTime <= existingBlock.a_block_begin && endTime >= existingBlock.a_block_begin)
    );
  
    return isAvailable;
  }
  
  isRoomAvailable(day: string, beginTime: number, endTime: number, roomCode: string): boolean {
    const roomBlocks = this.aBlocks.filter(block => 
      block.a_block_confirmed === 1 &&
      block.a_block_day === day &&
      block.a_block_room_code === roomCode
    );
  
    const isAvailable = !roomBlocks.some(existingBlock =>
      (beginTime >= existingBlock.a_block_begin && beginTime < existingBlock.a_block_end) ||
      (endTime > existingBlock.a_block_begin && endTime <= existingBlock.a_block_end) ||
      (beginTime <= existingBlock.a_block_begin && endTime >= existingBlock.a_block_begin)
    );
  
    return isAvailable;
  }
  filterConfirmedBlocks(blocks: any[]): any[] {
    return blocks.filter(block => block.a_block_confirmed === 1);
  }
  removeBlock(block:any){
    console.log("------");
    console.log(block.a_block_id);
    console.log("------");
    this.usersService.unconfirmAblock(block.a_block_id).subscribe((data: any) => {
      this.loadAblocks();
    });
  }
  getOccupiedRooms(day: string, beginTime: number, endTime: number): string[] {
    const occupiedRooms: string[] = [];
  
    this.aBlocks
      .filter(block => block.a_block_confirmed === 1 && block.a_block_day === day)
      .forEach(existingBlock => {
        // Přidání místnosti do seznamu, pokud je obsazená v daný čas
        if (
          (beginTime >= existingBlock.a_block_begin && beginTime < existingBlock.a_block_end) ||
          (endTime > existingBlock.a_block_begin && endTime <= existingBlock.a_block_end) ||
          (beginTime <= existingBlock.a_block_begin && endTime >= existingBlock.a_block_begin)
        ) {
          occupiedRooms.push(existingBlock.a_block_room_code);
        }
      });
  
    return occupiedRooms;
  }
  

}
