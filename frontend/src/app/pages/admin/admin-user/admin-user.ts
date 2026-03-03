import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule  } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenClip, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule ],
  templateUrl: './admin-user.html',
  styleUrl: './admin-user.css',
})
export class AdminUser implements OnInit {

  faOff = faToggleOff;
  faOn = faToggleOn;
  faPen = faPenClip;

  user: any;
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.userId = id;
        this.loadUser();
      }
    });
  }

  loading = true;

  loadUser() {
    this.loading = true;

    this.adminService.getUser(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;

        this.cdr.detectChanges(); 
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  deleteUser() {
      if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

      this.adminService.deleteUser(this.userId).subscribe({
        next: () => {
          alert("Utilisateur supprimé avec succès !");
          this.router.navigate(['/admin/users']); // Redirige vers la liste
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la suppression !");
        }
      });
    }


}