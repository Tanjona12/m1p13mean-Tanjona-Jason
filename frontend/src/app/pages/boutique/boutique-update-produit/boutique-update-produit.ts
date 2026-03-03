import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope, faMagnifyingGlass, faMapPin, faPhone, faGlobe, faPenToSquare, faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-boutique-update-produit',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule, ReactiveFormsModule ],
  templateUrl: './boutique-update-produit.html',
  styleUrl: './boutique-update-produit.css',
})
export class BoutiqueUpdateProduit implements OnInit {

  faSearch = faMagnifyingGlass;
  faClock = faClock;
  faPhone = faPhone;
  faMapPin = faMapPin;
  faEnvelop = faEnvelope;
  faGlobe = faGlobe;
  faUpdate = faPenToSquare;
  faOff = faToggleOff;
  faOn = faToggleOn;

  produit: any;
  produitId!: string;
  loading = true;
  errorMessage = '';

  produitForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boutiqueService: BoutiqueService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.produitId = id;
        this.loadProduit();
      }
    });
  }


  loadProduit() {
    this.loading = true;

    this.boutiqueService.getProduit(this.produitId).subscribe({
      next: (data) => {
        this.produit = data;
        this.initForm();
        this.loading = false;

        // 3. Forcez la détection de changement ici
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "Erreur lors du chargement de la produit.";
      }
    });
  }

  initForm() {
    this.produitForm = this.fb.group({
      name: [this.produit.name],
      description: [this.produit.description],
      price: [this.produit.price],
      stock: [this.produit.stock],
      category: [this.produit.category],
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.produitForm.valid) return;

    const formData = new FormData();
    Object.keys(this.produitForm.value).forEach(key => {
      formData.append(key, this.produitForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('imageProduit', this.selectedFile);
    }

    this.boutiqueService.updateProduit(this.produitId, formData).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/owner/shop']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || "Erreur serveur";
      }
    });
  }

}
