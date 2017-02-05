import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorksheetComponent } from './worksheet/worksheet.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { ResultReportComponent } from './result-report/result-report.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';

const _routes: Routes = [
  {
    path: 'worksheet',
    children: [
      {
        path: '',
        component: WorksheetComponent,
      },
      {
        path: 'result',
        component: ResultpageComponent,
      },
      {
        path: 'result-report',
        component: ResultReportComponent
      },
      {
        path: 'question/:index',
        component: QuestionDetailComponent
      },
      {
        path: 'report-dashboard',
        component: ReportDashboardComponent
      }

    ]
  },
  {
    path: '',
    redirectTo: 'worksheet',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(_routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
