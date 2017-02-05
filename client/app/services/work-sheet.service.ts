import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Worksheet } from './../../../shared/models/worksheet';
import { Question } from './../../../shared/models/question';

import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { StorageProperty, LocalStorage, SessionStorage } from 'h5webstorage';

@Injectable()
export class WorksheetService extends BaseService {
    private _apiUrl = 'api/worksheet/'; // URL to search web api
    private _maxQuestionsCount = 20;
    @StorageProperty({ storage: 'Session' }) worksheet: Worksheet;

    constructor(private _http: Http, router: Router, private sessionStorage: SessionStorage) {
        super(router);

    }

    getAllWorkSheet() {
        return [
            {
                'name': ' Multiplication',
                'operand1': 2,
                'operand2': 1,
                'operation': '×',
                'time': 300
            },
            {
                'name': 'Addition ',
                'operand1': 2,
                'operand2': 2,
                'operation': '+',
                'time': 240
            },
            {
                'name': 'Substraction',
                'operand1': 2,
                'operand2': 1,
                'operation': '-',
                'time': 240
            },
            {
                'name': 'Fraction',
                'operand1': 2,
                'operand2': 1,
                'operation': '>',
                'time': 600
            },

        ];
    }

    initWorkSheet(worksheetMetaData) {
        this.worksheet = new Worksheet();
        this.worksheet.name = worksheetMetaData.name;
        this.worksheet.allocatedTimeInSeconds = worksheetMetaData.time;
        this.worksheet.questions = [];
        for (let counter = 0; counter < this._maxQuestionsCount; counter++) {
            this.worksheet.questions.push(this.getNewQuestion(worksheetMetaData));
        }

    }
    saveWorkSheet(name: string, timeTaken: number, imageDataUrl: string) {
        // this._http.post(this._apiUrl, { 'name': name, 'data': imageDataUrl.replace('data:image/png;base64,', '') })
        //     .toPromise()
        //     .then(response => console.log('success'))
        //     .catch(this.errorFunction);
          console.log('saving image ' + imageDataUrl);

            this._http.post(this._apiUrl, { 'name': name, 'timeTaken': timeTaken, 'data': imageDataUrl })
            .toPromise()
            .then(response => console.log('success'))
            .catch(this.errorFunction);

    }
    updateWorkSheet(worksheetId, score) {
            this._http.put(this._apiUrl, { 'worksheetId': worksheetId, 'score': score })
            .toPromise()
            .then(response => console.log('success'))
            .catch(this.errorFunction);

    }

    getResult(dayOffset: number) {
        return this._http.get(this._apiUrl + '/' + dayOffset)
            .toPromise()
            .then(response => response.json().data as any)
            .catch(this.errorFunction);

    }
    errorFunction(err) {
        console.log(err);
    }
    getWorkSheet(): Worksheet {
        return this.worksheet;
    }

    getWorkSheetQuestion(index: number): Question {
        return this.getWorkSheet().questions[index];
    }

    getNewQuestion(metaData): Question {
        let question: Question = new Question();
        let operandFn = metaData.operation === '>' ? this.getFraction : this.getOperand;
        question.operand1 = operandFn(metaData.operand1, metaData.operand2, metaData.operation);
        question.operand2 = operandFn(metaData.operand2, metaData.operand1, metaData.operation);
        question.operation = metaData.operation;
        return question;
    }

    getFraction(power: number, otherPower: number, operation: string): string {
        let numerator = (Math.floor(Math.random() * 10)).toString();
        let denom = (Math.floor(Math.random() * 10)).toString();
        return numerator + '/' + denom;
    }

    getOperand(power: number, otherPower: number, operation: string): string {
        let max = Math.pow(10, power);
        let zeroString = '';
        let exp = power > otherPower ? power : otherPower;
        let powNum = exp;
        while (powNum--) {
            zeroString += '0';
        }

        let operand = (Math.floor(Math.random() * max)).toString();
        return (zeroString + operand).slice(exp * (-1));
    }



}
