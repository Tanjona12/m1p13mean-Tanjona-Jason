import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueProduit } from './boutique-produit';

describe('BoutiqueProduit', () => {
  let component: BoutiqueProduit;
  let fixture: ComponentFixture<BoutiqueProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueProduit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
