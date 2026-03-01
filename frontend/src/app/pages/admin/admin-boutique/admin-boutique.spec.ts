import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutique } from './admin-boutique';

describe('AdminBoutique', () => {
  let component: AdminBoutique;
  let fixture: ComponentFixture<AdminBoutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
