import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { User } from 'src/app/shared/models/user';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [
  ]
})
export class WorkdayFormComponent implements OnInit {

  workdayForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private workdaysService: WorkdaysService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.workdayForm = this.createWorkdayForm();

    // Temporaire: ajout en dur d'une nouvelle task
    /* const taskGroup: FormGroup = this.fb.group({
      'title': 'Ecrire un article sur awesome-angular.com !'
    });
    this.tasks.push(taskGroup); */

  }

  get dueDate() { return this.workdayForm.get('dueDate') as FormControl; }
  get notes() { return this.workdayForm.get('notes') as FormControl; }
  get tasks() { return this.workdayForm.get('tasks') as FormArray; }

  createWorkdayForm(): FormGroup {
   const workdayForm: FormGroup = this.fb.group({
    'dueDate': ['', [
      Validators.required
    ]],
    'tasks': this.fb.array([], [
      Validators.required,
      Validators.maxLength(6)
    ]),
    'notes': ['',[
      Validators.maxLength(1000)
    ]],
   });

   return workdayForm;
  }

  resetWorkdayForm() {
    while(this.tasks.length !== 0) {
     this.tasks.removeAt(0);
    }
    this.notes.reset();
   }

   onDateSelected(displayDate: string) {
    const user: User|null = this.authService.currentUser; // On va récupérer la journée de travail par date pour l'utilisateur courant seulement.

    if(user && user.id) {
     this.workdaysService.getWorkdayByDate(displayDate, user.id).subscribe(workday => {
      this.resetWorkdayForm(); // On réinitialise le formulaire d'une journée de travail.
      if(!workday) return; // Si cette journée de travail n'existe pas sur le Firestore, alors on s'arrête là.

      this.notes.setValue(workday.notes);
      workday.tasks.forEach(task => {
       const taskField: FormGroup = this.fb.group({
        title: task.title,
        todo: task.todo,
        done: task.done
       });
       this.tasks.push(taskField);
      });

     });
    }
   }

  submit(): void {
   const user: User|null = this.authService.currentUser;

   if(user) {
    const workday: Workday = new Workday({
      ...this.workdayForm.value,
      userId: user.id
    });
    this.workdaysService.save(workday).subscribe({
      next: () => this.router.navigate(['/app/planning']),
      error: () => this.workdayForm.reset()
    });
   }
  }

}
