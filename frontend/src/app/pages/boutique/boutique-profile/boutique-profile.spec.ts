import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueProfile } from './boutique-profile';

describe('BoutiqueProfile', () => {
  let component: BoutiqueProfile;
  let fixture: ComponentFixture<BoutiqueProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
