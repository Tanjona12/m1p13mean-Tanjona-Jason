import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateUser } from './admin-update-user';

describe('AdminUpdateUser', () => {
  let component: AdminUpdateUser;
  let fixture: ComponentFixture<AdminUpdateUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUpdateUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
