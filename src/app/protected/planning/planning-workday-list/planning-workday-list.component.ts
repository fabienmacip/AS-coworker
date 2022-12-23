import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent implements OnInit {

  workdays: { dueDate: string, doneTasks: number, remainingTasks: number }[];
  workdays$: Observable<{ dueDate: string, doneTasks: number, remainingTasks: number }[]>;

  constructor() { }

  ngOnInit(): void {
    this.workdays = [
      { dueDate: 'Lundi', doneTasks: 1, remainingTasks: 3 },
      { dueDate: 'Mardi', doneTasks: 0, remainingTasks: 2 },
      { dueDate: 'Mercredi', doneTasks: 0, remainingTasks: 1 },
      { dueDate: 'Jeudi', doneTasks: 3, remainingTasks: 0 },
      { dueDate: 'Vendredi', doneTasks: 2, remainingTasks: 1 },
      { dueDate: 'Mardi', doneTasks: 3, remainingTasks: 0 }
     ];

    this.workdays$ = of(this.workdays).pipe(delay(1000));
  }

  onWorkdayRemoved(dueDate: string){
    this.workdays = this.workdays.filter(workday =>
      !dueDate.includes(workday.dueDate)
    );
    this.workdays$ = of(this.workdays);
  }

}
