import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.errorMessage = "Veuillez remplir correctement le formulaire";
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {

        const role = res.user.role;

        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } 
        else if (role === 'boutique') {
          this.router.navigate(['/owner']);
        } 
        else {
          this.router.navigate(['/']);
        }

      },
      error: (err) => {
        this.errorMessage = err?.error?.message || "Erreur serveur";
      }
    });
  }
}