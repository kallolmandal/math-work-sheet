import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagetTitleService } from '../services/page-title.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit, OnDestroy {
  private _pageTitle: string;
  private _showPageTitle: boolean;
  constructor(private _pageTitleService: PagetTitleService) {
    _pageTitleService.getpagetTitleChangeEvent().subscribe((title) => { this._pageTitle = title; });
    _pageTitleService.getpagetTitleShowEvent().subscribe((show) => { this._showPageTitle = show; });
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
