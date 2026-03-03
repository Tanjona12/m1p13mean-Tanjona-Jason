import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueAccueil } from './boutique-accueil';

describe('BoutiqueAccueil', () => {
  let component: BoutiqueAccueil;
  let fixture: ComponentFixture<BoutiqueAccueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueAccueil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueAccueil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
