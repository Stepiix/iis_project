import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClickOutsideDirective } from './navbar/clickOuside.directive';
import { SubjectsComponent } from './subjects/subjects.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SetFreeTimeComponent } from './set-free-time/set-free-time.component';
import { GuaranteedSubjectsComponent } from './guaranteed-subjects/guaranteed-subjects.component';
import { UsersComponent } from './users/users.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SubjectsAdminComponent } from './subjects-admin/subjects-admin.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClickOutsideDirective,
    SubjectsComponent,
    ScheduleComponent,
    SetFreeTimeComponent,
    GuaranteedSubjectsComponent,
    UsersComponent,
    RoomsComponent,
    SubjectsAdminComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
