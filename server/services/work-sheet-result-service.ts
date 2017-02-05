import { WorksheetRepository } from '../repository/work-sheet-repository';

export namespace WorksheetResultService {
    export function init() {
        WorksheetRepository.init();
    }
    export function saveResult(name, timeTaken, imageData) {
        WorksheetRepository.save('1', '1', timeTaken, name, imageData);
    }
    export function saveScore(worksheetId, score) {
        WorksheetRepository.update(worksheetId, score);
    }

    export function getResult(dayOffset: number) {
        return WorksheetRepository.get('1', dayOffset);
    }
}
