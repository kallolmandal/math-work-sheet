import * as express from 'express';

import { WorksheetApiController } from '../controllers/work-sheet-api.controller';

let router = express.Router();


router.post('', function (req, res) {
  let controller = new WorksheetApiController(req);
  controller.save(req.body.name, req.body.data);
});

export { router as WorksheetApiRouter };
