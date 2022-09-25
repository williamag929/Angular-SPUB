import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { Suscription} from '../../../Models/suscription';
import { SuscriptionDialogComponent, SuscriptionDialogResult } from '../suscription-dialog/suscription-dialog.component';
  
const getObservable = (collection: AngularFirestoreCollection<Suscription>) => {
  const subject = new BehaviorSubject<Suscription[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Suscription[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-suscription',
  templateUrl: './suscription.component.html',
  styleUrls: ['./suscription.component.css']
})
export class SuscriptionComponent implements OnInit {

  displayedColumns: string[] = ['id','sectorid','contactid','address','status'];
  suscriptions = getObservable(this.store.collection('suscriptions')) as Observable<Suscription[]>;
  dataSource = new MatTableDataSource<Suscription>();
  itemList = Array<Suscription>();

  ngAfterViewInit() {
    }

  clickedRows(row : Suscription)
  {
    console.log(row);
  } 

  constructor(private dialog: MatDialog, private store: AngularFirestore) {
  }
  destroy$:Subject<void> = new Subject();
  
  ngOnInit(): void {
    this.suscriptions.pipe(
        takeUntil(this.destroy$) // Complete & cleanup
    ).subscribe(data => this.dataSource.data = data);

    console.log(this.suscriptions);
  }

  newSuscription(){
    const dialogRef = this.dialog.open(SuscriptionDialogComponent, {
      width: '600px',
      data: {
        suscriptions: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: SuscriptionDialogResult|undefined) => {
        console.log('close',result);
        if (!result) {
          return;
        }
        this.store.collection('suscriptions').add(result);
      });
  }


  editSuscription(row: Suscription){
    const dialogRef = this.dialog.open(SuscriptionDialogComponent, {
      width: '400px',
      data: {
        suscription: row,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: SuscriptionDialogResult|undefined) => {    
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection('suscriptions').doc(row.id).delete();
      } else {
        this.store.collection('suscriptions').doc(row.id).update(result);
      }
    });
  }


  ngOnDestroy() {
    this.destroy$.next();
}

}
function subscribe(arg0: (data: any) => any) {
  throw new Error('Function not implemented.');
}
