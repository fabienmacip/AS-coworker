import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [
  ]
})
export class WorkdayFormComponent implements OnInit {

  workdayForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    'dueDate': '',
    'tasks': this.fb.array([]),
    'notes': '',
   });

   return workdayForm;
  }

  submit(): void {
   console.info(this.workdayForm.value);
  }

}
