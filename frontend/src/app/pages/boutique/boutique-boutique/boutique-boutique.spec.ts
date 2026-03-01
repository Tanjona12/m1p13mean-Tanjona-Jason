import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueBoutique } from './boutique-boutique';

describe('BoutiqueBoutique', () => {
  let component: BoutiqueBoutique;
  let fixture: ComponentFixture<BoutiqueBoutique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueBoutique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueBoutique);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
