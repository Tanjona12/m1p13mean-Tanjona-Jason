import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenClip, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-users',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {
faOff = faToggleOff;
  faOn = faToggleOn;
  faPen = faPenClip;
}
