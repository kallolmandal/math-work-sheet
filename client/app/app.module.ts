// angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {PolymerElement} from '@vaadin/angular2-polymer';
import {RouterModule} from '@angular/router';
import {ModalModule } from 'ng2-modal';

// main application level components
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

// services
import {WorksheetService} from './services/work-sheet.service';

// third party services
import {WebStorageModule, BROWSER_STORAGE_PROVIDERS} from 'h5webstorage';
import { WorksheetComponent } from './worksheet/worksheet.component';
import { QuestionCanvasComponent } from './question-canvas/question-canvas.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionTimerComponent } from './question-timer/question-timer.component';
import { TimerPipe } from './timer.pipe';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { ResultReportComponent } from './result-report/result-report.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { SingleReportComponent } from './single-report/single-report.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageTitleComponent } from './page-title/page-title.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule, 
    WebStorageModule
  ],
  declarations: [
    AppComponent,
    WorksheetComponent,
    QuestionCanvasComponent,
    QuestionPreviewComponent,

    QuestionDetailComponent,

    QuestionListComponent,

    QuestionTimerComponent,

    TimerPipe,

    ResultpageComponent,

    ResultReportComponent,

    ReportDashboardComponent,

    SingleReportComponent,

    PageHeaderComponent,

    PageTitleComponent

    // Add polymer elements here
    // e.g. PolymerElement("paper-card"),
  ],
  providers: [
    WorksheetService,
    BROWSER_STORAGE_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
