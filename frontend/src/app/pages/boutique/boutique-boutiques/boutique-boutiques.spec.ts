import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueBoutiques } from './boutique-boutiques';

describe('BoutiqueBoutiques', () => {
  let component: BoutiqueBoutiques;
  let fixture: ComponentFixture<BoutiqueBoutiques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueBoutiques]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueBoutiques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
