import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueUpdateBoutique } from './boutique-update-boutique';

describe('BoutiqueUpdateBoutique', () => {
  let component: BoutiqueUpdateBoutique;
  let fixture: ComponentFixture<BoutiqueUpdateBoutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueUpdateBoutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueUpdateBoutique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
