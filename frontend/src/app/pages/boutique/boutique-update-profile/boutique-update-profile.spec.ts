import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueUpdateProfile } from './boutique-update-profile';

describe('BoutiqueUpdateProfile', () => {
  let component: BoutiqueUpdateProfile;
  let fixture: ComponentFixture<BoutiqueUpdateProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueUpdateProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueUpdateProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
