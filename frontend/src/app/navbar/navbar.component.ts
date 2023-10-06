import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  isMenuOpened1: boolean = false;
  isMenuOpened2: boolean = false;

  toggleMenu1(): void{
    this.isMenuOpened1 = !this.isMenuOpened1;
  }

  toggleMenu2(): void{
    this.isMenuOpened2 = !this.isMenuOpened2;
  }

  clickedOutside1(): void{
    this.isMenuOpened1 = false;
  }

  clickedOutside2(): void{
    this.isMenuOpened2 = false;
  }

}
