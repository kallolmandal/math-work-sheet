"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_controller_1 = require("./base.controller");
var work_sheet_result_service_1 = require("../../services/work-sheet-result-service");
var WorksheetApiController = (function (_super) {
    __extends(WorksheetApiController, _super);
    function WorksheetApiController(req) {
        return _super.call(this, req) || this;
    }
    WorksheetApiController.prototype.get = function (dayOffset) {
        return work_sheet_result_service_1.WorksheetResultService.getResult(dayOffset);
    };
    WorksheetApiController.prototype.save = function (name, timeTaken, imageDataUrl) {
        work_sheet_result_service_1.WorksheetResultService.saveResult(name, timeTaken, imageDataUrl);
    };
    WorksheetApiController.prototype.update = function (worksheetId, score) {
        work_sheet_result_service_1.WorksheetResultService.saveScore(worksheetId, score);
    };
    WorksheetApiController.prototype.getDefinitions = function () {
        return work_sheet_result_service_1.WorksheetResultService.getDefinitions();
    };
    return WorksheetApiController;
}(base_controller_1.BaseController));
exports.WorksheetApiController = WorksheetApiController;
//# sourceMappingURL=work-sheet-api.controller.js.map