"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_controller_1 = require("./base.controller");
var WorksheetResultsApiController = (function (_super) {
    __extends(WorksheetResultsApiController, _super);
    function WorksheetResultsApiController(req) {
        return _super.call(this, req) || this;
    }
    WorksheetResultsApiController.prototype.save = function (name, imageDataUrl) {
    };
    return WorksheetResultsApiController;
}(base_controller_1.BaseController));
exports.WorksheetResultsApiController = WorksheetResultsApiController;
//# sourceMappingURL=work-sheet-results-api.controller.js.map