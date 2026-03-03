import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-boutique-produit',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule ],
  templateUrl: './boutique-produit.html',
  styleUrl: './boutique-produit.css',
})
export class BoutiqueProduit {

  produit: any; 

  constructor(
      private route: ActivatedRoute,
      private boutiqueService: BoutiqueService,
      private router: Router,
      private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProduit(id);
      }
    });
  }

  loadProduit(id: string) {
    this.boutiqueService.getProduit(id).subscribe({
      next: (data) => {
        this.produit = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // Pour afficher le prix formaté
  formatPrice(value: number): string {
    return value.toLocaleString('fr-FR') + ' Ar';
  }

}
