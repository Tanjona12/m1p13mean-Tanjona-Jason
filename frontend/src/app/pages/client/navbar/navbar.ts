import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faShop, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, Footer],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  faHouse = faHouse;
  faShop = faShop;
  faCart = faCartShopping;
}
