import * as express from 'express';

import { WorksheetApiController } from '../controllers/work-sheet-api.controller';

let router = express.Router();

router.get('', function(req, res){
  let controller = new WorksheetApiController(req);
  controller.get()
            .then(function(result){
             res.json({ data: result });
            });

});

router.post('', function (req, res) {
  let controller = new WorksheetApiController(req);
  controller.save(req.body.name, req.body.timeTaken,req.body.data);
  console.log('post call');
});

router.put('', function (req, res) {
  let controller = new WorksheetApiController(req);
  controller.update(req.body.worksheetId, req.body.score);
  console.log('put call ' + req.body.worksheetId + 'score ' + req.body.score);
});


export { router as WorksheetApiRouter };
