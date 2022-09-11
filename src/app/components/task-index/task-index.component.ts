import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { TaskModel } from '../../../Models/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from './../task/task.component';
import { TaskDialogComponent, TaskDialogResult } from './../task-dialog/task-dialog.component';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

const getObservable = (collection: AngularFirestoreCollection<TaskModel>) => {
  const subject = new BehaviorSubject<TaskModel[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: TaskModel[]) => {
    subject.next(val);
  });
  return subject;
};


@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.css']
})
export class TaskIndexComponent {
    todo = getObservable(this.store.collection('todo')) as Observable<TaskModel[]>;
    inProgress = getObservable(this.store.collection('inProgress')) as Observable<TaskModel[]>;
    done = getObservable(this.store.collection('done')) as Observable<TaskModel[]>;
 

  //Observable<any> todo = this.store.doc('todo').valueChanges();

/* 
  todo = this.store.doc('todo').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  inProgress = this.store.collection('inProgress').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  done = this.store.collection('done').valueChanges({ idField: 'id' }) as Observable<Task[]>;
  
 */
  ngOnInit(): void {
  }

/*   todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ];
 */


  //inProgress: Task[] = [];
  //done: Task[] = [];

  editTask(list: 'done' | 'todo' | 'inProgress', task: TaskModel): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }


  drop(  event: CdkDragDrop<TaskModel[]|any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  constructor(private dialog: MatDialog, private store: AngularFirestore) {

   

  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.store.collection('todo').add(result.task);
      });
  }
}



