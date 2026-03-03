import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenClip, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-users',
  standalone: true, // important pour les imports standalone
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './admin-users.html',
  styleUrls: ['./admin-users.css'],
})
export class AdminUsers implements OnInit {
  faOff = faToggleOff;
  faOn = faToggleOn;
  faPen = faPenClip;

  users: any[] = [];
  filteredUsers: any[] = [];
  
  searchControl = new FormControl('');
  filterRole = '';
  
  // Pagination
  currentPage = 1;
  pageSize = 12;
  totalPages = 1;

  // Stats
  totalClients = 0;
  totalOwners = 0;
  totalUsers = 0;

  constructor(
     private adminService: AdminService,
     private router: Router,
     private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.loadUsers();

    // Rechercher en temps réel
    this.searchControl.valueChanges.subscribe(() => this.applyFilters());
  }

  loadUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: any[]) => {
        this.users = res.filter(u => u.role === 'client' || u.role === 'boutique');
        this.calculateStats();
        this.applyFilters();

        this.cdr.detectChanges(); 
      },
      error: err => console.error(err)
    });
  }

  calculateStats() {
    this.totalOwners = this.users.filter(u => u.role === 'boutique').length;
    this.totalClients = this.users.filter(u => u.role === 'client').length;
    this.totalUsers = this.totalOwners + this.totalClients;
  }

  applyFilters() {
    const search = this.searchControl.value?.toLowerCase() || '';
    this.filteredUsers = this.users.filter(u => {
      const matchesRole = this.filterRole ? (this.filterRole === 'client' ? u.role === 'client' : u.role === 'boutique') : true;
      const matchesSearch = u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search);
      return matchesRole && matchesSearch;
    });
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1;
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  toggleStatus(user: any) {
    const newStatus = !user.isActive;
    this.adminService.changeUserStatus(user._id, newStatus).subscribe({
      next: () => user.isActive = newStatus,
      error: err => console.error(err)
    });
  }
}