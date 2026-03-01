import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueNavbar } from './boutique-navbar';

describe('BoutiqueNavbar', () => {
  let component: BoutiqueNavbar;
  let fixture: ComponentFixture<BoutiqueNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
