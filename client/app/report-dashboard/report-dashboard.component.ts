import { Component, OnInit } from '@angular/core';
import { WorksheetService } from '../services/work-sheet.service';


@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.css']
})
export class ReportDashboardComponent implements OnInit {
  private allReports;
  private display = false;
  private dayOffset = 0;
  constructor(private _worksheetService: WorksheetService) {

  }

  ngOnInit() {
    this.getWorkSheetResult();
  }

  showNextReport() {
    this.dayOffset++;
    this.getWorkSheetResult();
  }
  showPreviousReport() {
    this.dayOffset--;
    this.getWorkSheetResult();
  }
  private getWorkSheetResult() {
    this._worksheetService.getResult(this.dayOffset)
      .then(data => {
        this.allReports = data;
        this.display = true;
      });

  }

}
