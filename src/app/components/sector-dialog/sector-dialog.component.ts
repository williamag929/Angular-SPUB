import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { InputBase } from '../../shared/base/input-base';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SectorService } from 'src/app/shared/services/sector.service';
import { Sector } from '../../../Models/sector';
import { ControlService } from 'src/app/shared/services/control.service';


@Component({
  selector: 'app-sector-dialog',
  template: ` 
    <form (ngSubmit)="onSubmit()" [formGroup]="form">
        <div *ngFor="let input of inputControls" class="form-row">
          <app-question [model]="input" [form]="form"></app-question>
        </div>
    
     
        <div mat-dialog-actions>
          <button mat-button type="submit" [disabled]="!form.valid">Ok</button>
          <button mat-button (click)="cancel()">Cancel</button>
          <button
            *ngIf="data.enableDelete"
            mat-fab
            color="primary"
            aria-label="Delete"
            [mat-dialog-close]="{ result: data, delete: true }">
            <mat-icon>delete</mat-icon>
          </button>
        </div>


      </form>
`,
  styleUrls: ['./sector-dialog.component.css'],
  providers:  [ControlService, SectorService]

})
export class SectorDialogComponent implements OnInit {

  @Input() inputControls: InputBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  inputs$: Observable<InputBase<any>[]>;
  //@Input() form!: FormGroup;
  //@Input() inputbase!: InputBase<string>;
  //@Output() onSubmit = new EventEmitter();
  //get isValid() { return this.form.controls[this.inputbase.key].valid; }
  //private backupSector: Partial<Sector> = { ...this.data.sector };
  sector: any;

  constructor(private qcs: ControlService, service: SectorService,
    public dialogRef: MatDialogRef<SectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SectorDialogData
  ) {
      this.inputs$ = service.getInputs();
      service.getInputs().subscribe(element => this.inputControls = element);
     
      
    }
  
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.inputControls as InputBase<string>[]);
  
    //this.form.controls['id'].setValue(this.data.sector.id);
    this.form.controls['companyid'].setValue(this.data.sector.companyid);
    this.form.controls['name'].setValue(this.data.sector.name);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log('dynamic',this.payLoad);

    this.data = this.form.getRawValue();
    console.log(this.data);

    this.dialogRef.close(this.form.getRawValue());
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
