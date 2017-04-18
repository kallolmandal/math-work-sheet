"use strict";
var express = require("express");
var work_sheet_results_api_controller_1 = require("../controllers/work-sheet-results-api.controller");
var router = express.Router();
exports.WorksheetApiRouter = router;
router.post('', function (req, res) {
    var controller = new work_sheet_results_api_controller_1.WorksheetResultsApiController(req);
    controller.save(req.body.name, req.body.data);
});
//# sourceMappingURL=work-sheet-results-api.router.js.map