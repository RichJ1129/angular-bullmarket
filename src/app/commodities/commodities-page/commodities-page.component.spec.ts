import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommoditiesPageComponent } from './commodities-page.component';

describe('CommoditiesPageComponent', () => {
  let component: CommoditiesPageComponent;
  let fixture: ComponentFixture<CommoditiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommoditiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommoditiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
