import * as tesseract from 'tesseract.js';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../../shared/models/question';
import { WorksheetService } from '../services/work-sheet.service';
import { Component, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  templateUrl: './question-canvas.component.html',
  styleUrls: ['./question-canvas.component.css'],
  selector: 'app-question-canvas',
})

export class QuestionCanvasComponent implements AfterViewInit, OnChanges {
  @Input() question: Question;
  @Input() currentIndex: number;
  rectW = 100;
  rectH = 100;
  rectColor = 'black';
  context: CanvasRenderingContext2D;
  clickX: any[] = [];
  clickY: any[] = [];
  clickDrag: any[] = [];
  paint: boolean;
  convertedText = 'data';
  offset = 0;


  @ViewChild('myCanvas') myCanvas;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _worksheetService: WorksheetService) { }

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');
    this.tick();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.question = changes['question'].currentValue;
    if (this.context) {
      this.clearText();
      this.redraw();
    }

  }
  tick() {
    let ctx = this.context;
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = this.rectColor;
    ctx.font = '40px Arial';
    this.drawQuestion();

  }
  drawComparisionQuestion() {
    this.drawFractionOperand(this.question.operand1, 150);
    this.drawFractionOperand(this.question.operand2, 220);

  }
  drawFractionOperand(operand1, leftx) {
    let array = operand1.split('/');
    let num = array[0];
    let denom = array[1];
    this.context.fillText(num, leftx, 150);
    this.context.fillText(denom, leftx, 190);
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.moveTo(leftx - 10, 155);
    this.context.lineTo(leftx + 30, 155);
    this.context.stroke();

  }
  drawNormalQuestion() {

    this.context.fillText(this.question.operand1, 150, 80);
    this.context.fillText(this.question.operation, 120, 105);
    this.context.fillText(this.question.operand2, 150, 120);
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.moveTo(120, 140);
    this.context.lineTo(230, 140);
    this.context.stroke();

  }

  drawQuestion() {
    if (!this.question.imageUrl) {
      if (this.question.operation === '>') {
        this.drawComparisionQuestion();
      } else {
        this.drawNormalQuestion();

      }

    } else {
      let img = new Image();
      let context = this.context;
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };
      img.src = this.question.imageUrl;
    }
  }

  _getText() {
    let component = this;
    tesseract.recognize(this.context)
      .progress(function () {
        console.log('progress ...');
      })
      .then(function (result) {
        component.convertedText = result.text;
        console.log('result');
        console.log(result);
      });
  }
  clearText() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawQuestion();
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.question.imageUrl = null;
  }
  _saveImage() {
    this.question.imageUrl = this.context.canvas.toDataURL();
  }
  _addClick(x, y, dragging) {
    console.log('x:' + x + 'y:' + y);
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }
  mousemove(e) {
    console.log('mouse move');
    if (this.paint) {
      console.log('mouse move');
      let mouseX = e.touches[0].pageX - this.myCanvas.nativeElement.offsetLeft - this.offset;
      let mouseY = e.touches[0].pageY - this.myCanvas.nativeElement.offsetTop - this.offset;
      this._addClick(mouseX, mouseY, true);
      this.redraw();
      e.preventDefault();
    }
  };

  mouseup() {
    this.paint = false;
  };

  mousedown(e) {

    let mouseX = e.touches[0].pageX - this.myCanvas.nativeElement.offsetLeft - this.offset;
    let mouseY = e.touches[0].pageY - this.myCanvas.nativeElement.offsetTop - this.offset;
    this.paint = true;
    console.log('mouse down  x  ' + e.pageX);

    this._addClick(mouseX, mouseY, false);
    this.redraw();
    e.preventDefault();
  }
  mouseleave() {
    this.paint = false;
  };

  redraw() {
    console.log('redraw' + this.clickX.length);

    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
    this.context.strokeStyle = 'black';
    this.context.lineJoin = 'round';
    this.context.lineWidth = 5;
    this.drawQuestion();

    for (let i = 0; i < this.clickX.length; i++) {
      this.context.beginPath();
      if (this.clickDrag[i] && i) {
        this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
      } else {
        this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
      }
      this.context.lineTo(this.clickX[i], this.clickY[i]);
      this.context.closePath();
      this.context.stroke();
    }
  }

  goNext() {
    this.currentIndex++;
    this._router.navigateByUrl('/worksheet/question/' + this.currentIndex);
    this._saveImage();

  }

  goPrevious() {
    this.currentIndex--;
    this._router.navigateByUrl('/worksheet/question/' + this.currentIndex--);
    this._saveImage();

  }
  save() {
    this._router.navigateByUrl('/worksheet/result');
  }

  shouldShowSave() {
    return this.currentIndex > this._worksheetService.getWorkSheet().questions.length - 2;
  }

}
