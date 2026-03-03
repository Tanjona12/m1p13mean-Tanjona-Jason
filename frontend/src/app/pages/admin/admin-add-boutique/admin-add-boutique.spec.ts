import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddBoutique } from './admin-add-boutique';

describe('AdminAddBoutique', () => {
  let component: AdminAddBoutique;
  let fixture: ComponentFixture<AdminAddBoutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddBoutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddBoutique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
