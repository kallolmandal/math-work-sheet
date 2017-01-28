import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../../shared/models/question';
import { WorksheetService } from '../services/work-sheet.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  question: Question;
  currentIndex: number;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _worksheetService: WorksheetService) { }
  ngOnInit() {

    this._activatedRoute.params.subscribe(
      (params) => {
        this.currentIndex = +params['index'];
        this.question = this._worksheetService.getWorkSheetQuestion(this.currentIndex);
      }
    );

  }
  displayWorksheet() {
    this._router.navigateByUrl('worksheet');

  }


}
