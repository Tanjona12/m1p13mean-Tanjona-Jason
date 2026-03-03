import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueAddProduit } from './boutique-add-produit';

describe('BoutiqueAddProduit', () => {
  let component: BoutiqueAddProduit;
  let fixture: ComponentFixture<BoutiqueAddProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueAddProduit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueAddProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
