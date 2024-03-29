import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'al-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isLoading$;
  }

}
