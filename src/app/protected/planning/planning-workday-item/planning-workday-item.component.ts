import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Workday } from 'src/app/shared/models/workday';


@Component({
  selector: 'al-planning-workday-item',
  templateUrl: './planning-workday-item.component.html',
  styles: [
  ]
})
export class PlanningWorkdayItemComponent implements OnInit {

  @Input() workday: Workday;
  @Output() workdayRemoved = new EventEmitter<Workday>();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void { }

  goWorkday(workday: Workday) {
    this.router.navigate(
     ['app/workday'],
     {
      queryParams: {
       date: workday.dueDate
      }
     }
    );
   }

  removeWorkday(workday: Workday) {
    this.workdayRemoved.emit(workday);
   }


}
