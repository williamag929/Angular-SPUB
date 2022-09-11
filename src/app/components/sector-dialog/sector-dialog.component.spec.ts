import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorDialogComponent } from './sector-dialog.component';

describe('SectorDialogComponent', () => {
  let component: SectorDialogComponent;
  let fixture: ComponentFixture<SectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
