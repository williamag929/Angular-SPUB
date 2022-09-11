import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { InputBase } from '../../shared/base/input-base';
import { Observable } from 'rxjs';
import { Contact } from '../../../Models/contact';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/app/shared/services/contact.service';


@Component({
  selector: 'app-contact-dialog', 
  template: `
  <div>
    <h2>Contact</h2>
    <app-dynamic-form [inputControls]="inputs$ | async"></app-dynamic-form>
  </div>
`,
providers:  [ContactService]
})
export class ContactDialogComponent{

  inputs$: Observable<InputBase<any>[]>;
  @Input() form!: FormGroup;
  @Input() inputbase!: InputBase<string>;
  @Output() onSubmit = new EventEmitter();
  get isValid() { return this.form.controls[this.inputbase.key].valid; }
  private backupContact: Partial<Contact> = { ...this.data.contact };
  contact: any;

  constructor(service: ContactService,private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactDialogData
  ) {
    this.inputs$ = service.getInputs();
  }

  cancel(): void {
    this.data.contact.firstName = this.backupContact.firstName;
    this.data.contact.lastName = this.backupContact.lastName;
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

