import { Component, OnInit } from '@angular/core';
import { PagetTitleService } from '../services/page-title.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  private _showHeader: boolean;
  constructor(private _pageTitleService: PagetTitleService) {
    _pageTitleService.getpagetTitleShowEvent().subscribe((show) => { this._showHeader = show; });
  }

  ngOnInit() {
  }

}
