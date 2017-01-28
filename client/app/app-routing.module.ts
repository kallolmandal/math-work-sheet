import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorksheetComponent } from './worksheet/worksheet.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { ResultpageComponent } from './resultpage/resultpage.component';


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
        path: 'question/:index',
        component: QuestionDetailComponent
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
