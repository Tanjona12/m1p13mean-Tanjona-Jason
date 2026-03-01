import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faShop, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boutique-navbar',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './boutique-navbar.html',
  styleUrl: './boutique-navbar.css',
})
export class BoutiqueNavbar {
  faHouse = faHouse;
  faShop = faShop;
  faUser = faUser;
  faLogout = faRightFromBracket;
}
