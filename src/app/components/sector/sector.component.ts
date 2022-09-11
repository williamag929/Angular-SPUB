import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import { SectorDialogResult, SectorDialogComponent } from '../sector-dialog/sector-dialog.component';

import { Sector } from '../../../Models/sector';

const getObservable = (collection: AngularFirestoreCollection<Sector>) => {
  const subject = new BehaviorSubject<Sector[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Sector[]) => {
    subject.next(val);
  });
  return subject;
};


@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  displayedColumns: string[] = ['companyid','name'];
  sectors = getObservable(this.store.collection('sectors')) as Observable<Sector[]>;
  dataSource = new MatTableDataSource<Sector>();
  itemList = Array<Sector>();

  ngAfterViewInit() {
    }

  clickedRows(row : Sector)
  {
    console.log(row);
  } 

  constructor(private dialog: MatDialog, private store: AngularFirestore) {
  }
  destroy$:Subject<void> = new Subject();
  
  ngOnInit(): void {
    this.sectors.pipe(
        takeUntil(this.destroy$) // Complete & cleanup
    ).subscribe(data => this.dataSource.data = data);

    console.log(this.sectors);
  }

  newSector(){
    const dialogRef = this.dialog.open(SectorDialogComponent, {
      width: '270px',
      data: {
        sector: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: SectorDialogResult|undefined) => {
        console.log('close',result);
        if (!result) {
          return;
        }
        this.store.collection('sectors').add(result);
      });
  }


  editSector(row: Sector){
    const dialogRef = this.dialog.open(SectorDialogComponent, {
      width: '270px',
      data: {
        sector: row,
      },
    });
    dialogRef.afterClosed().subscribe((result: SectorDialogResult|undefined) => {    
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection('sectors').doc(row.id).delete();
      } else {
        this.store.collection('sectors').doc(row.id).update(result);
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
