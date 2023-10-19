import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './subjects/subjects.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SetFreeTimeComponent } from './set-free-time/set-free-time.component';
import { GuaranteedSubjectsComponent } from './guaranteed-subjects/guaranteed-subjects.component';
import { UsersComponent } from './users/users.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SubjectsAdminComponent } from './subjects-admin/subjects-admin.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: 'subjects', component: SubjectsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'set_free_time', component: SetFreeTimeComponent },
  { path: 'guaranteed_subjects', component: GuaranteedSubjectsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'subjects_admin', component: SubjectsAdminComponent },
  { path: 'sign_in', component: SignInComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
