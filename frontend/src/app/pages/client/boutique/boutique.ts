import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faEnvelope, faMagnifyingGlass, faMapPin, faPhone, faGlobe} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boutique',
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './boutique.html',
  styleUrl: './boutique.css',
})
export class Boutique {
  faSearch = faMagnifyingGlass;
  faClock = faClock;
  faPhone = faPhone;
  faMapPin = faMapPin;
  faEnvelop = faEnvelope;
  faGlobe = faGlobe;
}
