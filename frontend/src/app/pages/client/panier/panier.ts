import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../../../services/cart.service'; // ajuste chemin

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',

})
export class Panier {
  cartItems$!: Observable<CartItem[]>;

  livraison = 5000;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.items$;
  }

  increment(id: string) {
    this.cartService.increment(id);
  }

  decrement(id: string) {
    this.cartService.decrement(id);
  }

  setQuantity(id: string, event: any) {
    this.cartService.setQuantity(id, event.target.value);
  }

  remove(id: string) {
    this.cartService.remove(id);
  }

  subtotal(): number {
    return this.cartService.getSubtotal();
  }

  total(): number {
    const sub = this.subtotal();
    return sub > 0 ? sub + this.livraison : 0;
  }

  formatPrice(value: number): string {
    return (value || 0).toLocaleString('fr-FR') + ' Ar';
  }

  trackById(index: number, item: any): string {
  return item.id;
}
}