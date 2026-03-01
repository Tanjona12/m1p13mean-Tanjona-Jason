import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateBoutique } from './admin-update-boutique';

describe('AdminUpdateBoutique', () => {
  let component: AdminUpdateBoutique;
  let fixture: ComponentFixture<AdminUpdateBoutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateBoutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateBoutique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
