export namespace WorksheetSchema {
    export let worksheetResult = {
        worksheetName: String,
        worksheetId: String,
        studentId: String,
        timeTaken: Number,
        date: { type: Date, default: Date.now },
        resultImg: { data: String, contentType: String },
        isChecked: Boolean,
        score: Number

    };
}
