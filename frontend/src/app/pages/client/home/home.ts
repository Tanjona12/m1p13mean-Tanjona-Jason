import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  faSearch = faMagnifyingGlass;
  faOff = faToggleOff;
  faOn = faToggleOn;

  boutiques: any[] = [];
  filteredBoutiques: any[] = [];
  searchTerm: string = '';

  produits: any[] = [];

  constructor(
    private adminService: AdminService,
    private boutiqueService: BoutiqueService,
    private cdr: ChangeDetectorRef
  
  ) {}

  ngOnInit(): void {
    this.loadBoutiques();
    this.loadProduits();
  }

  loadBoutiques() {
    this.adminService.getBoutiques().subscribe({
      next: (data) => {
        this.boutiques = data;
        this.filteredBoutiques = data; 

        // 3. Forcez la détection de changement ici
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(err)
    });
  }

  loadProduits() {
    this.boutiqueService.getProduits().subscribe({
      next: (data) => {
        this.produits = data;

        // 3. Forcez la détection de changement ici
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(err)
    });
  }

  formatPrice(value: number): string {
    return value.toLocaleString('fr-FR') + ' Ar';
  }
}