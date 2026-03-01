import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boutiques',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './boutiques.html',
  styleUrl: './boutiques.css',
})
export class Boutiques {
    faSearch = faMagnifyingGlass;
  
}
