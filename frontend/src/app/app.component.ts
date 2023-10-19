import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iis_project';
  userRole: string; // Vytvoření proměnné pro ukládání role uživatele

  constructor() {
    this.userRole = ''; // Inicializace proměnné
  }
}
