"use strict";
var WorksheetSchema;
(function (WorksheetSchema) {
    WorksheetSchema.worksheetResult = {
        worksheetName: String,
        worksheetId: String,
        studentId: String,
        timeTaken: Number,
        date: { type: Date, default: Date.now },
        resultImg: { data: String, contentType: String },
        isChecked: Boolean,
        score: Number
    };
    WorksheetSchema.worksheetDefinition = {
        name: String,
        operand1: String,
        operand2: String,
        operation: String,
        time: Number,
    };
})(WorksheetSchema = exports.WorksheetSchema || (exports.WorksheetSchema = {}));
//# sourceMappingURL=work-sheet-schema.js.map