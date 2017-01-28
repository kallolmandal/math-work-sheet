import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WorksheetService } from '../services/work-sheet.service';
import { Worksheet } from '../../../shared/models/worksheet';
import { StorageProperty, LocalStorage, SessionStorage } from 'h5webstorage';


@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css']
})
export class WorksheetComponent implements OnInit, AfterViewInit {

  private worksheetList: any[];
  private displayReady: boolean = false;

  constructor(private _worksheetService: WorksheetService, private sessionStorage: SessionStorage, private _router: Router) { }

  ngOnInit() {
    this.worksheetList = this._worksheetService.getAllWorkSheet();
    this.displayReady = true;
  }

  openWorkSheet(metaData) {
    this._worksheetService.initWorkSheet(metaData);
    this._router.navigateByUrl('worksheet/question/0');
  }

  ngAfterViewInit() {
  }


}
