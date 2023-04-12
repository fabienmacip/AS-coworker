import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Workday } from 'src/app/shared/models/workday';


@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [
  ]
})
export class PlanningWorkdayItemComponent implements OnInit {

/*   @Input() dueDate: string;
  @Input() doneTasks: number | string;
  @Input() remainingTasks: number | string;
 */
  @Input() workday: Workday;

  @Output() workdayRemoved = new EventEmitter<Workday>();

  ngOnInit(): void {

  }

/*   ngOnChanges(changes: SimpleChanges) {
   for (const propName in changes) {
    this.update(propName, changes[propName].currentValue);
   }
  }
 */
/*   update(propName: string, propValue: string|number) {

   switch (propName) {
    case 'dueDate': {
     if ('Lundi' === propValue) { this.dueDate += ' (Aujourd\'hui)'; }
     break;
    }
    case 'doneTasks': {
     if (0 === propValue) { this.doneTasks = 'Aucune tâche terminé.'; }
     break;
    }
    case 'remainingTasks': {
     if (0 === propValue) {
      this.remainingTasks = 'Journée de travail terminée !';
     }
     break;
    }
    default: {
     break;
    }
   }
  }
 */
  removeWorkday(workday: Workday) {
    this.workdayRemoved.emit(workday);
   }

  //@Input() workday: { dueDate: string, doneTasks: number, remainingTasks: number };

  /*
  currentWorkday: { dueDate: string, doneTasks: number, remainingTasks: number };

  @Input()
  set workday(workday: { dueDate: string, doneTasks: number, remainingTasks: number }) {
    this.currentWorkday = workday || {};

    if ('Lundi' === workday.dueDate) {
     this.currentWorkday.dueDate += ' (Aujourd\'hui)';
    }
   }

   get workday() { return this.currentWorkday; } */

}
