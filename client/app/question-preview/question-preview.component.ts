import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Question } from '../../../shared/models/question';


@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.css']
})
export class QuestionPreviewComponent implements OnInit {
  @Input() question: Question;
  @Input() question_index: number;
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  showDetail(question: Question) {
    this._router.navigateByUrl('/worksheet/question/' + this.question_index);
  }

}
