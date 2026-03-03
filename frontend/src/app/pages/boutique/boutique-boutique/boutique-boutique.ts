import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope, faMagnifyingGlass, faMapPin, faPhone, faGlobe, faPenToSquare, faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

import { AdminService } from '../../../services/admin.service';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-boutique-boutique',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule ],
  templateUrl: './boutique-boutique.html',
  styleUrl: './boutique-boutique.css',
})
export class BoutiqueBoutique implements OnInit {

  faSearch = faMagnifyingGlass;
  faClock = faClock;
  faPhone = faPhone;
  faMapPin = faMapPin;
  faEnvelop = faEnvelope;
  faGlobe = faGlobe;
  faUpdate = faPenToSquare;
  faOff = faToggleOff;
  faOn = faToggleOn;

  boutique: any;
  boutiqueId!: string;

  produits: any[] = [];
  filteredProduits: any[] = [];

  searchTerm: string = '';

  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 0;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private boutiqueService: BoutiqueService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.boutiqueId = id;
        this.loadBoutique();
        this.loadProduits();
      }
    });
  }

  loading = true;

  loadBoutique() {
    this.loading = true;

    this.adminService.getBoutique(this.boutiqueId).subscribe({
      next: (data) => {
        this.boutique = data;
        this.loading = false;

        // 3. Forcez la détection de changement ici
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadProduits() {
    this.boutiqueService.getProduitsBoutique(this.boutiqueId).subscribe({
      next: (res) => {
        this.produits = res.produits || [];
        this.filteredProduits = [...this.produits];
        this.calculatePagination();

        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(err)
    });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();

    this.filteredProduits = this.produits.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm)
    );

    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(
      this.filteredProduits.length / this.itemsPerPage
    );
  }

  get paginatedProduits() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProduits.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  formatPrice(value: number): string {
    return value.toLocaleString('fr-FR') + ' Ar';
  }

}
