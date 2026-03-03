import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-boutiques',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './boutiques.html',
  styleUrl: './boutiques.css',
})
export class Boutiques implements OnInit {

  faSearch = faMagnifyingGlass;
  faOff = faToggleOff;
  faOn = faToggleOn;

  boutiques: any[] = [];
  filteredBoutiques: any[] = [];
  searchTerm: string = '';

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  
  ) {}

  ngOnInit(): void {
    this.loadBoutiques();
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

  onSearch() {
    const term = this.searchTerm.toLowerCase();

    this.filteredBoutiques = this.boutiques.filter(b =>
      b.name_shop?.toLowerCase().includes(term) ||
      b.box?.toLowerCase().includes(term) ||
      b.description?.toLowerCase().includes(term)
    );
  }
}