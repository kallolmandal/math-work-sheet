import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { WorksheetService } from '../services/work-sheet.service';


@Component({
  selector: 'app-question-timer',
  templateUrl: './question-timer.component.html',
  styleUrls: ['./question-timer.component.css']
})
export class QuestionTimerComponent implements OnInit, OnDestroy {
  subs: Subscription;
  ticks = 0;
  timeWarning: number = 15;
  blink: boolean = false;
  allocatedTime: number;
  constructor(private _router: Router, private _worksheetService: WorksheetService) { }

  ngOnInit() {
    this.allocatedTime = this._worksheetService.getWorkSheet().allocatedTimeInSeconds;
    let timer = Observable.timer(2000, 1000);
    this.subs = timer.subscribe(t => this.checkTimer(t));
  }

  ngOnDestroy() {
    console.log('unsubscribing timer');
    this.subs.unsubscribe();
  }

  checkTimer(time: number) {
    this.ticks = time;
    if (time === this.allocatedTime - this.timeWarning) {
      this.blink = true;
    }
    if (time === this.allocatedTime) {
      this.subs.unsubscribe();
      this._router.navigateByUrl('worksheet/result');
    }
  }

}
