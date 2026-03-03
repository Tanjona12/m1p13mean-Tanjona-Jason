import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { BoutiqueService } from '../../../services/boutique.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './produit.html',
  styleUrl: './produit.css',
})
export class Produit implements OnInit {

  produit: any;
  quantity: number = 1;
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.loadProduit(id);
    });
  }

  loadProduit(id: string) {
    this.boutiqueService.getProduit(id).subscribe({
      next: (data) => {
        this.produit = data;
        this.calculateTotal();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  onQuantityChange(event: any) {
    const value = Number(event.target.value);
    this.quantity = value > 0 ? value : 1;
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.produit?.price * this.quantity || 0;
  }

  addToCart() {
    if (!this.produit) return;
    this.cartService.addToCart(this.produit, this.quantity);
    this.router.navigateByUrl('/panier'); // optionnel
  }

  formatPrice(value: number): string {
    return value.toLocaleString('fr-FR') + ' Ar';
  }
}