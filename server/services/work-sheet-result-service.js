"use strict";
var work_sheet_repository_1 = require("../repository/work-sheet-repository");
var WorksheetResultService;
(function (WorksheetResultService) {
    function init() {
        work_sheet_repository_1.WorksheetRepository.init();
    }
    WorksheetResultService.init = init;
    function saveResult(name, timeTaken, imageData) {
        work_sheet_repository_1.WorksheetRepository.save('1', '1', timeTaken, name, imageData);
    }
    WorksheetResultService.saveResult = saveResult;
    function saveScore(worksheetId, score) {
        work_sheet_repository_1.WorksheetRepository.update(worksheetId, score);
    }
    WorksheetResultService.saveScore = saveScore;
    function getResult(dayOffset) {
        return work_sheet_repository_1.WorksheetRepository.get('1', dayOffset);
    }
    WorksheetResultService.getResult = getResult;
    function getDefinitions() {
        return work_sheet_repository_1.WorksheetRepository.getDefinitions();
    }
    WorksheetResultService.getDefinitions = getDefinitions;
})(WorksheetResultService = exports.WorksheetResultService || (exports.WorksheetResultService = {}));
//# sourceMappingURL=work-sheet-result-service.js.map