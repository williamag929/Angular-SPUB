import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Contact } from 'src/Models/contact';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ContactDialogResult, ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

const getObservable = (collection: AngularFirestoreCollection<Contact>) => {
  const subject = new BehaviorSubject<Contact[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Contact[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] = ['firstname','lastname','address','email'];
  contacts = getObservable(this.store.collection('contacts')) as Observable<Contact[]>;
  dataSource = new MatTableDataSource<Contact>();
  itemList = Array<Contact>();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    }

  clickedRows(row : Contact)
  {
    console.log(row);
  } 


  constructor(private dialog: MatDialog, private store: AngularFirestore) {
  }
  destroy$:Subject<void> = new Subject();
  
  ngOnInit(): void {

    this.contacts.pipe(
        takeUntil(this.destroy$) // Complete & cleanup
    ).subscribe(data => this.dataSource.data = data);
 
    this.dataSource.paginator = this.paginator;
  
  }

  newContact(){
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: ContactDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.store.collection('contacts').add(result.contact);
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
}



}
function subscribe(arg0: (data: any) => any) {
  throw new Error('Function not implemented.');
}

