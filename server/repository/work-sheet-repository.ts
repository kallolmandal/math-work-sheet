import * as mongoose from 'mongoose';
import { WorksheetSchema } from './schema/work-sheet-schema';

export namespace WorksheetRepository {
    let connectionString = 'mongodb://user1:user1@ds055574.mlab.com:55574/worksheet-result';
    let WorksheetModel;
    export function init() {
        mongoose.connect(connectionString);
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('database opened');
        });
        initSchema();
    }
    export function save(worksheetId, studentId, timeTaken, name, imgBlob) {
        let wsModel = new WorksheetModel({
            worksheetId: worksheetId,
            studentId: studentId,
            timeTaken: timeTaken,
            isChecked: false,
            score:0,
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
    export function update(worksheetId, score) {
        console.log('updating worksheet' + worksheetId + 'score' + score);
        WorksheetModel.findOne({ _id: worksheetId }, function (err, doc) {
            console.log('found one');
            doc.score = score;
            doc.resultImg.data = null;
            doc.isChecked = true;
            doc.save();
        });
    }

    export function get(studentId) {
        return WorksheetModel.find().exec();
    }

    function initSchema() {
        WorksheetModel = mongoose.model('WorksheetResult', new mongoose.Schema(WorksheetSchema.worksheetResult));
    }

}