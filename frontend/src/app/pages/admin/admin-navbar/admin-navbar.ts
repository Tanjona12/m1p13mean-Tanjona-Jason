import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faShop, faCartShopping, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar {
  faHouse = faHouse;
  faShop = faShop;
  faUser = faUser;
  faLogout = faRightFromBracket;
}
