import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscriptionDialogComponent } from './suscription-dialog.component';

describe('SuscriptionDialogComponent', () => {
  let component: SuscriptionDialogComponent;
  let fixture: ComponentFixture<SuscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuscriptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
