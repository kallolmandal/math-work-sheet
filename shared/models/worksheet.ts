import { Question } from './question';

export class Worksheet {
    allocatedTimeInSeconds: number;
    questions: Question[];
    name:string;
    timeTaken:number;
}
