import { Component, OnInit } from '@angular/core';
import { WorksheetService } from '../services/work-sheet.service';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-result-report',
    templateUrl: 'result-report.component.html',
    styleUrls: ['result-report.component.css']
})
export class ResultReportComponent implements OnInit {
    private allReports;
    private display = false;
    private score;
    constructor(private _worksheetService: WorksheetService,
        private _sanitizer: DomSanitizer, ) {
    }

    ngOnInit() {
        let self = this;
        this._worksheetService.getResult(0)
            .then(data => {
                self.allReports = data;
                self.display = true;
            });

    }

    getImageDateUrl(url): string {
        return ('data:image/png;base64,' + url);
    }

    updateScore(report) {
        this._worksheetService.updateWorkSheet(report._id, report.score);
    }

}
