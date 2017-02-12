import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-single-answer',
  templateUrl: './single-answer.component.html',
  styleUrls: ['./single-answer.component.css']
})
export class SingleAnswerComponent {

  @Input() private index;
  @Input() private answers;
  constructor() { }

  toggleAnswer(event) {
    let answer = this.answers[this.index];
    answer = answer === undefined ? true : !answer;
    this.answers[this.index] = answer;
    event.stopPropagation();
  }

  hasAnswer() {
    return this.answers[this.index] !== undefined;
  }
}
