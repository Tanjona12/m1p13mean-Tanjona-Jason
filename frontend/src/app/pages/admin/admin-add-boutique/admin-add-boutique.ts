import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-boutique',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-add-boutique.html',
  styleUrl: './admin-add-boutique.css',
})
export class AdminAddBoutique implements OnInit {

  owners: any[] = [];
  selectedFile!: File;
  errorMessage = '';
  boutiqueForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.boutiqueForm = this.fb.group({
      name_shop: ['', Validators.required],
      description: [''],
      box: [''],
      proprietaire: ['', Validators.required],
      phone: [''],
      openingDays: [''],
      openingHour: [''],
      closingHour: [''],
      facebook: [''],
      instagram: [''],
      website: ['']
    });

    // Charger propriétaires
    this.adminService.getBoutiqueUsers().subscribe({
      next: (res) => this.owners = res,
      error: (err) => console.error(err)
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.boutiqueForm.invalid) return;

    const formData = new FormData();

    Object.entries(this.boutiqueForm.value).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });

    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

    this.adminService.createBoutique(formData).subscribe({
      next: () => {
        alert("Boutique créée !");
        this.router.navigate(['/admin/shop']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
}