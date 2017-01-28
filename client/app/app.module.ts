// angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {PolymerElement} from '@vaadin/angular2-polymer';
import {RouterModule} from '@angular/router';

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

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
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
