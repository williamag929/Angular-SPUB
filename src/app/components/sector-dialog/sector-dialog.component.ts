import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { InputBase } from '../../shared/base/input-base';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SectorService } from 'src/app/shared/services/sector.service';
import { Sector } from '../../../Models/sector';


@Component({
  selector: 'app-sector-dialog',
  template: `
  <div>
    <h2>Sector</h2>
    <app-dynamic-form [inputControls]="inputs$ | async"></app-dynamic-form>
  </div>
`,
  styleUrls: ['./sector-dialog.component.css'],
  providers:  [SectorService]

})
export class SectorDialogComponent {

  inputs$: Observable<InputBase<any>[]>;
  @Input() form!: FormGroup;
  @Input() inputbase!: InputBase<string>;
  @Output() onSubmit = new EventEmitter();
  get isValid() { return this.form.controls[this.inputbase.key].valid; }
  //private backupSector: Partial<Sector> = { ...this.data.sector };
  contact: any;

  constructor(service: SectorService,private fb: FormBuilder,
    public dialogRef: MatDialogRef<SectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SectorDialogComponent
  ) {
    this.inputs$ = service.getInputs();
  }

  cancel(): void {
  
    this.dialogRef.close(this.data);
  }

}

export interface SectorDialogData {
  sector: Partial<Sector>;
  enableDelete: boolean;
}

export interface SectorDialogResult {
  sector: Sector;
  delete?: boolean;
}
