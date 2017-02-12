import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WorksheetService } from '../services/work-sheet.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-single-report',
  templateUrl: './single-report.component.html',
  styleUrls: ['./single-report.component.css']
})
export class SingleReportComponent implements OnInit, OnChanges {
  @Input() private allReports;
  private display = false;
  private score;
  private selectedReport;
  private answers;
  constructor(private _worksheetService: WorksheetService,
    private _sanitizer: DomSanitizer, ) {
  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.display = true;
  }
  getImageDateUrl(url): string {
    return ('data:image/png;base64,' + url);
  }
  selectReport(report) {
    this.selectedReport = report;

  }
  updateScore(report) {
    this._worksheetService.updateWorkSheet(this.selectedReport.report._id, this.getScore());
  }
  getScore() {
    return this.selectedReport.answers.filter(a => a).length;
  }
}
