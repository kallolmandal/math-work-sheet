import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WorksheetService } from '../services/work-sheet.service';
import { Worksheet } from '../../../shared/models/worksheet';
import { StorageProperty, LocalStorage, SessionStorage } from 'h5webstorage';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css']
})
export class ResultpageComponent implements OnInit, AfterViewInit {
  @StorageProperty({ storage: 'Session' }) worksheet: Worksheet;
  private displayReady = false;
  context: CanvasRenderingContext2D;
  @ViewChild('myCanvas') myCanvas;

  constructor(private _worksheetService: WorksheetService, private sessionStorage: SessionStorage, private _router: Router) { }

  ngOnInit() {
    this.worksheet = this._worksheetService.getWorkSheet();
    this.displayReady = true;
  }

  ShowResult() {

    let context = this.context;
    let counter = 0;
    context.canvas.width = 750;
    context.canvas.height = 1000;
    this.worksheet.questions.forEach(element => {
      if (element.imageUrl) {
        let img = new Image();
        let xoffset = (counter % 3) * 150 + 40;
        let yoffset = Math.floor(counter / 3) * 150;
        console.log('canvas-- ' + xoffset + ':' + yoffset);
        counter++;
        img.onload = function () {
          context.drawImage(img, xoffset, yoffset, 200, 200);
        };
        img.src = element.imageUrl;

      }
    });
  }
  saveWorksheet() {
    let imgdata = this.context.canvas.toDataURL().replace('data:image/png;base64,', '');
    console.log('image data from client' + imgdata);
    this._worksheetService.saveWorkSheet(this.worksheet.name, this.worksheet.timeTaken, imgdata);
  }


  ngAfterViewInit() {
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');
    let self = this;

    this.ShowResult();
    setTimeout(function () {
      self.saveWorksheet();
      setTimeout(function () {
        self._router.navigateByUrl('/worksheet');
      }, 1000);
    }, 1000);

  }


}
