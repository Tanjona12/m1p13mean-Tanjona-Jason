import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueUpdateProduit } from './boutique-update-produit';

describe('BoutiqueUpdateProduit', () => {
  let component: BoutiqueUpdateProduit;
  let fixture: ComponentFixture<BoutiqueUpdateProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueUpdateProduit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueUpdateProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
