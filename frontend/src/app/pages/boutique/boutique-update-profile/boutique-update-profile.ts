import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope, faMagnifyingGlass, faMapPin, faPhone, faGlobe, faPenToSquare, faToggleOff, faToggleOn} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-boutique-update-profile',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule, ReactiveFormsModule ],
  templateUrl: './boutique-update-profile.html',
  styleUrl: './boutique-update-profile.css',
})
export class BoutiqueUpdateProfile implements OnInit {

  faSearch = faMagnifyingGlass;
  faClock = faClock;
  faPhone = faPhone;
  faMapPin = faMapPin;
  faEnvelop = faEnvelope;
  faGlobe = faGlobe;
  faUpdate = faPenToSquare;
  faOff = faToggleOff;
  faOn = faToggleOn;

  user: any;
  userId!: string;
  loading = true;
  errorMessage = '';

  userForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
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


  loadUser() {
    this.loading = true;

    this.adminService.getUser(this.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.initForm();
        this.loading = false;

        this.cdr.detectChanges(); 
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      name: [this.user.name],
      phone: [this.user.phone],
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.userForm.valid) return;

    const formData = new FormData();
    Object.keys(this.userForm.value).forEach(key => {
      formData.append(key, this.userForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.clientService.updateClient(this.userId, formData).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/owner/profil']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || "Erreur serveur";
      }
    });
  }

}
