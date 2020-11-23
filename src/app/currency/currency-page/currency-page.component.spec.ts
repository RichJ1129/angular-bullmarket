import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPageComponent } from './currency-page.component';

describe('CurrencyPageComponent', () => {
  let component: CurrencyPageComponent;
  let fixture: ComponentFixture<CurrencyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
