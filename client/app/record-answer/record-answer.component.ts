import { Component, OnInit, Input } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-record-answer',
  templateUrl: './record-answer.component.html',
  styleUrls: ['./record-answer.component.css']
})
export class RecordAnswerComponent implements OnInit, OnChanges {
  @Input() answers;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.answers = changes['answers'].currentValue;
  }

   getScore() {
    return this.answers.filter(a => a).length;
  }
}
