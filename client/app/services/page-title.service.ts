import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class PagetTitleService {
    private _pagetTitleChangeEvent: EventEmitter<string>;
    private _pagetTitleShowEvent: EventEmitter<boolean>;
    constructor() {
        this._pagetTitleChangeEvent = new EventEmitter<string>();
        this._pagetTitleShowEvent = new EventEmitter<boolean>();
    }

    getpagetTitleChangeEvent(): EventEmitter<string> {
        return this._pagetTitleChangeEvent;
    }

    getpagetTitleShowEvent(): EventEmitter<boolean> {
        return this._pagetTitleShowEvent;
    }
}
