import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InputBase } from '../../shared/base/input-base';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Suscription } from '../../../Models/suscription';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Contact } from 'src/Models/contact';
import { Sector } from 'src/Models/sector';

const getContactsObservable = (collection: AngularFirestoreCollection<Contact>) => {
  const subject = new BehaviorSubject<Contact[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contact[]) => {
    subject.next(val);
  });
  return subject;
};

const getSectorsObservable = (collection: AngularFirestoreCollection<Sector>) => {
  const subject = new BehaviorSubject<Sector[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Sector[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-suscription-dialog',
  templateUrl: './suscription-dialog.component.html',
  styleUrls: ['./suscription-dialog.component.css']
})
export class SuscriptionDialogComponent implements OnInit {

  form!: FormGroup;
  payLoad = '';
  suscripion: any;
  //contacts: any;
  sectors = getSectorsObservable(this.store.collection('sectors')) as Observable<Sector[]>;

  pricelists: any;

  contacts = getContactsObservable(this.store.collection('contacts')) as Observable<Contact[]>;


  constructor(private fb: FormBuilder,  private store: AngularFirestore,
    public dialogRef: MatDialogRef<SuscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuscriptionDialogData
  ) {
      this.CreateForm();
    }

    CreateForm() {
      this.form = this.fb.group({
        companyid:['1',''],
        address:['',Validators.required],
        contactid:['',Validators.required],
        sectorid:['',Validators.required],
        state:['',Validators.required],
        city:['',Validators.required],
        status:['',Validators.required],
        readCode:['',Validators.required],
        renewed:['',Validators.required],
        externalCode:['',Validators.required],
        subsidyValue:['',Validators.required],
        subsidyStatus:['',Validators.required],
      });
    }

    ngOnInit() {
      this.form.controls['companyid'].setValue(this.data.suscription.companyid);
      this.form.controls['address'].setValue(this.data.suscription.address);
      this.form.controls['contactid'].setValue(this.data.suscription.contactid);
      this.form.controls['sectorid'].setValue(this.data.suscription.sectorid);
      this.form.controls['state'].setValue(this.data.suscription.state);
      this.form.controls['city'].setValue(this.data.suscription.city);
      this.form.controls['status'].setValue(this.data.suscription.status);
      this.form.controls['readCode'].setValue(this.data.suscription.readCode);
      this.form.controls['renewed'].setValue(this.data.suscription.renewed);
      this.form.controls['externalCode'].setValue(this.data.suscription.externalCode);
      this.form.controls['subsidyValue'].setValue(this.data.suscription.subsidyValue);
      this.form.controls['subsidyStatus'].setValue(this.data.suscription.subsidyStatus);
     
   
      //console.log(this.form);
      //this.form = this.qcs.toFormGroup(this.inputControls as InputBase<string>[]);
    
      //this.form.controls['id'].setValue(this.data.sector.id);
      //this.form.controls['companyid'].setValue(this.data.sector.companyid);
      //this.form.controls['name'].setValue(this.data.sector.name);
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

    get addressInvalid(){
      return this.form.get('address')?.invalid && this.form.get('address')?.touched
    }

    get isValid() { return this.form.controls['address'].valid; }
  
  }
  
  export interface SuscriptionDialogData {
    suscription: Partial<Suscription>;
    enableDelete: boolean;
  }
  
  export interface SuscriptionDialogResult {
    sector: Suscription;
    delete?: boolean;
  }
  