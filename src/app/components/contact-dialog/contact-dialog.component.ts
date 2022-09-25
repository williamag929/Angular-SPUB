import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { InputBase } from '../../shared/base/input-base';
import { Observable } from 'rxjs';
import { Contact } from '../../../Models/contact';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/app/shared/services/contact.service';
import { ControlService } from 'src/app/shared/services/control.service';


@Component({
  selector: 'app-contact-dialog', 
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
providers:  [ControlService, ContactService]
})
export class ContactDialogComponent implements OnInit{

  @Input() inputControls: InputBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  inputs$: Observable<InputBase<any>[]>;
  //@Input() form!: FormGroup;
  //@Input() inputbase!: InputBase<string>;
  //@Output() onSubmit = new EventEmitter();
  //get isValid() { return this.form.controls[this.inputbase.key].valid; }
  //private backupContact: Partial<Contact> = { ...this.data.contact };
  contact: any;

  constructor(private qcs: ControlService, service: ContactService,private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactDialogData
  ) {
    this.inputs$ = service.getInputs();
    service.getInputs().subscribe(element => this.inputControls = element);
     
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.inputControls as InputBase<string>[]);
  
  
    //this.form.controls['id'].setValue(this.data.sector.id);
    //this.form.controls['companyid'].setValue(this.data.contact.companyid);
    this.form.controls['firstName'].setValue(this.data.contact.firstName);
    this.form.controls['lastName'].setValue(this.data.contact.lastName);
    this.form.controls['address'].setValue(this.data.contact.address);
    this.form.controls['city'].setValue(this.data.contact.city);
    this.form.controls['state'].setValue(this.data.contact.state);
    this.form.controls['postalCode'].setValue(this.data.contact.postalCode);
    this.form.controls['email'].setValue(this.data.contact.email);
    this.form.controls['phoneNumber'].setValue(this.data.contact.phoneNumber);
    this.form.controls['status'].setValue(this.data.contact.status);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log('dynamic',this.payLoad);

    this.data = this.form.getRawValue();
    console.log(this.data);

    this.dialogRef.close(this.form.getRawValue());
  }  

  cancel(): void {
    //this.data.contact.firstName = this.backupContact.firstName;
    //this.data.contact.lastName = this.backupContact.lastName;
    this.dialogRef.close(this.data);
  }

}

export interface ContactDialogData {
  contact: Partial<Contact>;
  enableDelete: boolean;
}

export interface ContactDialogResult {
  contact: Contact;
  delete?: boolean;
}

