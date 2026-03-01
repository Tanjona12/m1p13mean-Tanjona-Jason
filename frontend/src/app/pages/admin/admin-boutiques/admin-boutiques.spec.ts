import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoutiques } from './admin-boutiques';

describe('AdminBoutiques', () => {
  let component: AdminBoutiques;
  let fixture: ComponentFixture<AdminBoutiques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBoutiques]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBoutiques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
