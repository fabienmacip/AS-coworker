import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { User } from 'src/app/shared/models/user';
import { Workday } from 'src/app/shared/models/workday';
@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent implements OnInit {

  workdays: Workday[];

  constructor(
    private authService: AuthService,
    private workdayService: WorkdaysService
  ) { }

  ngOnInit(): void {
    const user: User|null = this.authService.currentUser;
    if(user && user.id) {
      this.workdayService.getWorkdayByUser(user.id).
      subscribe((workdays: Workday[]) => this.workdays = workdays);
    }
  }

  onWorkdayRemoved(workday: Workday){
    console.info(workday.dueDate);
/*     this.workdays = this.workdays.filter(workday =>
      !dueDate.includes(workday.dueDate)
    );
    this.workdays$ = of(this.workdays);
 */  }

}
