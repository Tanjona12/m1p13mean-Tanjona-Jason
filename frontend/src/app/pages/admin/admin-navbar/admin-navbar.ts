import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink  } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faShop, faCartShopping, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, Footer, RouterOutlet, RouterLink],
  templateUrl: './admin-navbar.html',
  styleUrls: ['./admin-navbar.css'],
})
export class AdminNavbar {
  faHouse = faHouse;
  faShop = faShop;
  faUser = faUser;
  faLogout = faRightFromBracket;

  constructor(private authService: AuthService, 
    private router: Router) {}

  logout() {
    this.authService.logout();      
    this.router.navigate(['/login']);
  }
}


