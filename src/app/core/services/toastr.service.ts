import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Toastr } from 'src/app/shared/models/toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  private toastr: BehaviorSubject<Toastr|null> = new BehaviorSubject<Toastr|null>(null);
  /* private toastr: BehaviorSubject<Toastr|null> = new BehaviorSubject<Toastr|null>({
    category: 'info',
    message: 'Le service de retour utilisateur fonctionne ! (toastr)'
  }); */
  readonly toastr$: Observable<Toastr|null> = this.toastr.asObservable();

  constructor() { }

  showToastr(toastr: Toastr): void {
    timer(0, 3000).pipe(take(2)).subscribe(i => {
      if(i === 0) {
        this.toastr.next(toastr);
      } else {
        this.toastr.next(null);
      }
    });
  }
}
