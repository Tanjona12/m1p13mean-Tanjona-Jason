import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-boutique-boutiques',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './boutique-boutiques.html',
  styleUrl: './boutique-boutiques.css',
})
export class BoutiqueBoutiques implements OnInit {

  boutique: any;

  constructor(
    private boutiqueService: BoutiqueService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMyBoutique();
  }

  loadMyBoutique() {
  this.boutiqueService.getBoutiqueOwner().subscribe({
    next: (data) => {
      console.log("Boutique owner:", data);
      this.boutique = data;

      this.cdr.detectChanges(); 
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}