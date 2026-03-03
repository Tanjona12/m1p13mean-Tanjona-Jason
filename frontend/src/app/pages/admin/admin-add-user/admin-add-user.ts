import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-add-user.html',
  styleUrl: './admin-add-user.css',
})
export class AdminAddUser {

  userForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cin: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {

    if (this.userForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs";
      return;
    }

    const formData = new FormData();

    Object.keys(this.userForm.value).forEach(key => {
      formData.append(key, this.userForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append("image", this.selectedFile);
    }

    this.adminService.createBoutiqueUser(formData).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Utilisateur créé avec succès';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/admin/users']);
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur serveur";
        this.successMessage = '';
      }
    });
  }
}