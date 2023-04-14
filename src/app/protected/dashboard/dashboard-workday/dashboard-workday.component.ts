import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, interval, of } from 'rxjs';
import { delay, map, takeUntil, takeWhile } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { Task } from 'src/app/shared/models/task';
import { User } from 'src/app/shared/models/user';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-dashboard-workday',
  templateUrl: './dashboard-workday.component.html',
  styleUrls: ['./dashboard-workday.component.scss']
})
export class DashboardWorkdayComponent implements OnInit {

  @Input() workday: Workday;
  isPomodoroActive: boolean;
  isWorkdayComplete: boolean;

  startPomodoro$: Subject<string>;
  cancelPomodoro$: Subject<string>;
  completePomodoro$: Subject<string>;
  currentProgress: number;
  maxProgress: number;

  pomodoro$: Observable<number>;

  currentTask: Task|undefined;

  constructor(
    private workdaysService: WorkdaysService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isPomodoroActive = false;
    this.isWorkdayComplete = (this.getCurrentTask() === undefined);
    this.startPomodoro$ = new Subject();
    this.cancelPomodoro$ = new Subject();
    this.completePomodoro$ = new Subject();
    this.currentProgress = 0;
    const user: User|null = this.authService.currentUser;
    if(user) {
      this.maxProgress = user.pomodoroDuration;
    }
    //this.pomodoro$ = interval(1000).pipe(map(x => x + 1));

    this.pomodoro$ = interval(1000).pipe(
      takeUntil(this.cancelPomodoro$),
      takeUntil(this.completePomodoro$),
      takeWhile(progress => progress <= this.maxProgress),
      map(x => x + 1)
    );
  }

  startPomodoro() {
    this.isPomodoroActive = true;
    this.startPomodoro$.next('start');

    this.pomodoro$.subscribe(currentProgress => {
      this.currentProgress = currentProgress;
      //console.log(currentProgress+"/"+this.maxProgress);
      if(currentProgress === this.maxProgress) {
        of(0).pipe(delay(500)).subscribe(_ => this.completePomodoro());
      }
    });
  }

  cancelPomodoro() {
    this.isPomodoroActive = false;
    this.cancelPomodoro$.next('cancel');
  }

  completePomodoro() {
    this.completePomodoro$.next('complete');
    this.isPomodoroActive = false;

    this.getCurrentTask()!.done++; //this.task.done++; ???

    this.isWorkdayComplete = (this.getCurrentTask() === undefined); // = (this.task === undefined) ???

    this.workdaysService.update(this.workday).subscribe();

/*     this.currentTask = this.getCurrentTask();

    if(this.currentTask) {
      this.currentTask.done++;
    }

    this.isWorkdayComplete = (this.getCurrentTask() === undefined); */
  }

  getCurrentTask(): Task|undefined {
    return this.workday.tasks.find(task => task.todo > task.done)
  }

}
