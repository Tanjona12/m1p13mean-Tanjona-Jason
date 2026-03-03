import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope, faMagnifyingGlass, faMapPin, faPhone, faGlobe, faPenToSquare, faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-boutique-update-boutique',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule, ReactiveFormsModule ],
  templateUrl: './boutique-update-boutique.html',
  styleUrl: './boutique-update-boutique.css',
})
export class BoutiqueUpdateBoutique implements OnInit {

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
  loading = true;
  errorMessage = '';

  boutiqueForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private boutiqueService: BoutiqueService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.boutiqueId = id;
        this.loadBoutique();
      }
    });
  }


  loadBoutique() {
    this.loading = true;

    this.adminService.getBoutique(this.boutiqueId).subscribe({
      next: (data) => {
        this.boutique = data;
        this.initForm();
        this.loading = false;

        // 3. Forcez la détection de changement ici
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Erreur lors du chargement de la boutique.";
      }
    });
  }

  initForm() {
    this.boutiqueForm = this.fb.group({
      name_shop: [this.boutique.name_shop],
      description: [this.boutique.description],
      phone: [this.boutique.phone],
      openingDays: [this.boutique.openingDays],
      openingHour: [this.boutique.openingHour],
      closingHour: [this.boutique.closingHour],
      facebook: [this.boutique.facebook],
      instagram: [this.boutique.instagram],
      website: [this.boutique.website],
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.boutiqueForm.valid) return;

    const formData = new FormData();
    Object.keys(this.boutiqueForm.value).forEach(key => {
      formData.append(key, this.boutiqueForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

    this.boutiqueService.updateBoutique(this.boutiqueId, formData).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/owner/shop', this.boutiqueId]);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || "Erreur serveur";
      }
    });
  }

}
