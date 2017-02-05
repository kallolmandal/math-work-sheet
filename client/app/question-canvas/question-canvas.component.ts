import * as tesseract from 'tesseract.js';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../../../shared/models/question';
import { WorksheetService } from '../services/work-sheet.service';
import { PagetTitleService } from '../services/page-title.service';
import { Component, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  templateUrl: './question-canvas.component.html',
  styleUrls: ['./question-canvas.component.css'],
  selector: 'app-question-canvas',
})

export class QuestionCanvasComponent implements AfterViewInit, OnChanges {
  private _backGroundImageUrl = '/images/back-ground.png';
  @Input() question: Question;
  @Input() currentIndex: number;
  rectColor = 'black';
  context: CanvasRenderingContext2D;
  clickX: any[] = [];
  clickY: any[] = [];
  clickDrag: any[] = [];
  paint: boolean;
  convertedText = 'data';
  offset = 0;


  @ViewChild('myCanvas') myCanvas;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    private _worksheetService: WorksheetService, private _pageTitleService: PagetTitleService) {
    this._pageTitleService.getpagetTitleShowEvent().emit(false);
  }

  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');
    this.tick();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.question = changes['question'].currentValue;
    if (this.context) {
      this.ClearText();
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
    this.context.fillText(this.question.operand1, 80, 150);
    this.context.fillText(this.question.operand2, 220, 150);
    // this.context.fillRect(150,80,80,80);

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
    let self = this;
    if (!this.question.imageUrl) {
      let background = new Image();
      background.src = this._backGroundImageUrl;
      background.onload = function () {
        self.context.drawImage(background, 0, 0, 400, 400);
        if (self.question.operation === '>') {
          self.drawComparisionQuestion();
        } else {
          self.drawNormalQuestion();

        }
      };



    } else {
      let img = new Image();
      let context = this.context;
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };
      img.src = this.question.imageUrl;
    }
  }

  GetText() {
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
  ClearText() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawQuestion();
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
    this.question.imageUrl = null;
  }
  SaveImage() {
    this.question.imageUrl = this.context.canvas.toDataURL();
  }
  addClick(x, y, dragging) {
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
      this.addClick(mouseX, mouseY, true);
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

    this.addClick(mouseX, mouseY, false);
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
    this.SaveImage();

  }

  goPrevious() {
    this.currentIndex--;
    this._router.navigateByUrl('/worksheet/question/' + this.currentIndex--);
    this.SaveImage();

  }
  save() {
    this._router.navigateByUrl('/worksheet/result');
  }

  shouldShowSave() {
    return this.currentIndex > this._worksheetService.getWorkSheet().questions.length - 2;
  }

}
