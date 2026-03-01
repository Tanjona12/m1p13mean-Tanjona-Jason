import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faShop, faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  faHouse = faHouse;
  faShop = faShop;
  faCart = faCartShopping;
}
