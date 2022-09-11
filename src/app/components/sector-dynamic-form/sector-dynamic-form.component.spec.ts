import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorDynamicFormComponent } from './sector-dynamic-form.component';

describe('SectorDynamicFormComponent', () => {
  let component: SectorDynamicFormComponent;
  let fixture: ComponentFixture<SectorDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorDynamicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
