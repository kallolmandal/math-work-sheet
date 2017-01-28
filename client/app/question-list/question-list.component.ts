import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Question } from '../../../shared/models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  @Input() questionList: Question[];
  constructor() { }

  ngOnInit() {
  }


}
