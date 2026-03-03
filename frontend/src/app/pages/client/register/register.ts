import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = "Veuillez remplir correctement le formulaire";
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';

        // redirection après succès
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {

      console.log("Erreur complète :", err); // DEBUG

      if (err.error && err.error.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = "Erreur serveur";
      }

      this.successMessage = '';
    }
    });
  }
}