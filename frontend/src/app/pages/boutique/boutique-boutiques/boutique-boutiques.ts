import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boutique-boutiques',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './boutique-boutiques.html',
  styleUrl: './boutique-boutiques.css',
})
export class BoutiqueBoutiques {
faSearch = faMagnifyingGlass;
  faOff = faToggleOff;
  faOn = faToggleOn;
}
