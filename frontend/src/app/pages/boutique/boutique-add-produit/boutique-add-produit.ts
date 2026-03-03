import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BoutiqueService } from '../../../services/boutique.service';

@Component({
  selector: 'app-boutique-add-produit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './boutique-add-produit.html',
  styleUrl: './boutique-add-produit.css',
})
export class BoutiqueAddProduit {

  productForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private boutiqueService: BoutiqueService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {

    if (this.productForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs";
      return;
    }

    const formData = new FormData();

    Object.keys(this.productForm.value).forEach(key => {
      formData.append(key, this.productForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append("imageProduit", this.selectedFile);
    }

    this.boutiqueService.createProduit(formData).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Produit créé avec succès';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/owner/shop']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur serveur";
        this.successMessage = '';
      }
    });
  }
}