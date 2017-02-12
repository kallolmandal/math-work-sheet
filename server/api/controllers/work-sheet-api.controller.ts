import * as express from 'express';

import { BaseController } from './base.controller';

import { Worksheet } from '../../../shared/models/worksheet';

import { WorksheetResultService } from '../../services/work-sheet-result-service';


export class WorksheetApiController extends BaseController {

  constructor(req: express.Request) {
    super(req);
  }
  get(dayOffset: number) {
    return WorksheetResultService.getResult(dayOffset);
  }

  save(name: string, timeTaken: number, imageDataUrl: string) {
    WorksheetResultService.saveResult(name, timeTaken, imageDataUrl);
  }

  update(worksheetId: string, score: string) {
    WorksheetResultService.saveScore(worksheetId, score);
  }

  getDefinitions() {
    return WorksheetResultService.getDefinitions();
  }
}
