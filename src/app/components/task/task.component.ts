import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskModel } from '../../../Models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: TaskModel | null = null;
  @Output() edit = new EventEmitter<TaskModel>();

  constructor() { }

  ngOnInit(): void {
  }

}
