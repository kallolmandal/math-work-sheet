"use strict";
var mongoose = require("mongoose");
var work_sheet_schema_1 = require("./schema/work-sheet-schema");
var WorksheetRepository;
(function (WorksheetRepository) {
    var connectionString = 'mongodb://user1:user1@ds055574.mlab.com:55574/worksheet-result';
    var WorksheetModel;
    var WorksheetDefinitionModel;
    function init() {
        mongoose.connect(connectionString);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('database opened');
        });
        initSchema();
    }
    WorksheetRepository.init = init;
    function save(worksheetId, studentId, timeTaken, name, imgBlob) {
        var wsModel = new WorksheetModel({
            worksheetName: name,
            worksheetId: worksheetId,
            studentId: studentId,
            timeTaken: timeTaken,
            isChecked: false,
            score: 0,
            resultImg: {
                // data: Buffer.from(imgBlob, 'base64'),
                data: imgBlob,
                contentType: 'jpg'
            }
        });
        wsModel.save(function (err, model) {
            if (err) {
                console.log('error' + err);
                return;
            }
            console.log('model saved' + model.resultImg.contentType);
        });
    }
    WorksheetRepository.save = save;
    function update(worksheetId, score) {
        console.log('updating worksheet' + worksheetId + 'score' + score);
        WorksheetModel.findOne({ _id: worksheetId }, function (err, doc) {
            console.log('found one');
            doc.score = score;
            doc.resultImg.data = null;
            doc.isChecked = true;
            doc.save();
        });
    }
    WorksheetRepository.update = update;
    function get(studentId, dayOffset) {
        var dateOfReport = new Date();
        console.log('offset ' + dayOffset);
        console.log('new Date' + dateOfReport.toDateString());
        dateOfReport.setDate(dateOfReport.getDate() + dayOffset);
        var nextDate = new Date();
        nextDate.setDate(dateOfReport.getDate() + 1);
        console.log('currentDate' + dateOfReport.toDateString());
        console.log('nextDate' + nextDate.toDateString());
        return WorksheetModel.find({ 'date': { '$gte': getDate(dateOfReport), '$lt': getDate(nextDate) } }).exec();
    }
    WorksheetRepository.get = get;
    function getDefinitions() {
        return WorksheetDefinitionModel.find().exec();
    }
    WorksheetRepository.getDefinitions = getDefinitions;
    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    function initSchema() {
        WorksheetModel = mongoose.model('WorksheetResult', new mongoose.Schema(work_sheet_schema_1.WorksheetSchema.worksheetResult), 'worksheetresults');
        WorksheetDefinitionModel = mongoose.model('WorksheetDefinition', new mongoose.Schema(work_sheet_schema_1.WorksheetSchema.worksheetDefinition), 'worksheetdefinition');
    }
})(WorksheetRepository = exports.WorksheetRepository || (exports.WorksheetRepository = {}));
//# sourceMappingURL=work-sheet-repository.js.map