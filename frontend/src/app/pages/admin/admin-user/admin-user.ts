import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenClip, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-user',
  imports: [FontAwesomeModule, RouterOutlet],
  templateUrl: './admin-user.html',
  styleUrl: './admin-user.css',
})
export class AdminUser {
  faOff = faToggleOff;
  faOn = faToggleOn;
  faPen = faPenClip;
}
