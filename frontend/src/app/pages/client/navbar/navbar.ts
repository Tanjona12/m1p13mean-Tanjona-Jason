import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faShop, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { Observable, map } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FontAwesomeModule, Footer],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  faHouse = faHouse;
  faShop = faShop;
  faCart = faCartShopping;

  cartCount$!: Observable<number>;
  loggedIn$!: Observable<boolean>;  // ✅ déclaré ici

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    // ✅ init ici
    this.loggedIn$ = this.authService.loggedIn$;

    this.cartCount$ = this.cartService.items$.pipe(
      map(items => items.reduce((sum, i) => sum + i.quantity, 0))
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}