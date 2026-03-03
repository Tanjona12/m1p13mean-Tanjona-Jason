import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faShop, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-boutique-navbar',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, Footer],
  templateUrl: './boutique-navbar.html',
  styleUrl: './boutique-navbar.css',
})
export class BoutiqueNavbar {
  faHouse = faHouse;
  faShop = faShop;
  faUser = faUser;
  faLogout = faRightFromBracket;
}
