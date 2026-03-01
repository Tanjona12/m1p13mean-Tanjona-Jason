import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifUtilisateur } from './modif-utilisateur';

describe('ModifUtilisateur', () => {
  let component: ModifUtilisateur;
  let fixture: ComponentFixture<ModifUtilisateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifUtilisateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifUtilisateur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
