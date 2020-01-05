import { Component, OnInit } from '@angular/core';
import { ComplexCounterService, ComplexCounterActionType } from '../services/complex-counter.service';

@Component({
  selector: 'app-complex-counter',
  templateUrl: './complex-counter.component.html',
  styleUrls: ['./complex-counter.component.scss']
})
export class ComplexCounterComponent implements OnInit {

  actionType = ComplexCounterActionType; 
  constructor(
    public count: ComplexCounterService
  ) { }

  ngOnInit() {
  }

}
