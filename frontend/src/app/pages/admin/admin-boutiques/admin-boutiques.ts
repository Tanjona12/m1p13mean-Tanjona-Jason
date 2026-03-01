import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-boutiques',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './admin-boutiques.html',
  styleUrl: './admin-boutiques.css',
})
export class AdminBoutiques {
  faSearch = faMagnifyingGlass;
  faOff = faToggleOff;
  faOn = faToggleOn;
}
