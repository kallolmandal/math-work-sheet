import * as express from 'express';

import { BaseController } from './base.controller';

import { Worksheet } from '../../../shared/models/worksheet';


export class WorksheetResultsApiController extends BaseController {

  constructor(req: express.Request) {
    super(req);
  }
  save(name: string, imageDataUrl: string) {
  }

}
