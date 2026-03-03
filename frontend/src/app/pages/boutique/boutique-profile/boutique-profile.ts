import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoutiqueService } from '../../../services/boutique.service';
import { ActivatedRoute, RouterModule, Router } from "@angular/router";

@Component({
  selector: 'app-boutique-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './boutique-profile.html',
  styleUrl: './boutique-profile.css',
})
export class BoutiqueProfile implements OnInit {

  user: any;

  constructor(
    private boutiqueService: BoutiqueService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.boutiqueService.getMe().subscribe({
      next: (data) => {
        console.log("Utilisateur connecté :", data);
        this.user = data;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long'
    });
  }
}