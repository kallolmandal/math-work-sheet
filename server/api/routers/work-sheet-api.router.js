"use strict";
var express = require("express");
var work_sheet_api_controller_1 = require("../controllers/work-sheet-api.controller");
var router = express.Router();
exports.WorksheetApiRouter = router;
router.get('/definitions', function (req, res) {
    var controller = new work_sheet_api_controller_1.WorksheetApiController(req);
    controller.getDefinitions()
        .then(function (result) {
        res.json({ data: result });
    });
});
router.get('/:day', function (req, res) {
    var controller = new work_sheet_api_controller_1.WorksheetApiController(req);
    var dayOffset = parseInt(req.params.day, 10);
    console.log('get call ' + dayOffset);
    controller.get(dayOffset)
        .then(function (result) {
        res.json({ data: result });
    });
});
router.post('', function (req, res) {
    var controller = new work_sheet_api_controller_1.WorksheetApiController(req);
    controller.save(req.body.name, req.body.timeTaken, req.body.data);
});
router.put('', function (req, res) {
    var controller = new work_sheet_api_controller_1.WorksheetApiController(req);
    controller.update(req.body.worksheetId, req.body.score);
    console.log('put call ' + req.body.worksheetId + 'score ' + req.body.score);
});
//# sourceMappingURL=work-sheet-api.router.js.map