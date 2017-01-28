import * as express from 'express';

import { WorksheetResultsApiController } from '../controllers/work-sheet-results-api.controller';

let router = express.Router();

router.post('', function (req, res) {
  let controller = new WorksheetResultsApiController(req);
  controller.save(req.body.name, req.body.data);
});

export { router as WorksheetApiRouter };
