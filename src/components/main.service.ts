import { Observable, Subject } from 'rxjs';

export class MainService {
    static randomNumber$: Subject<number> = new Subject<number>();

    static isMenuOpened$: Subject<boolean> = new Subject<boolean>();

    static getRandomNumber(elementsNum: number): number {
        return Math.floor(Math.random() * elementsNum);
    }

    // ([0,1,2,3,4], 2) --> [[3,1], [4,0,2]]
    // ([0,1,2,3,4], 3) --> [[3,1], [4,0], [2]]
    static divideOnGroups<T>(array: Array<T>, groupsNum: number, eachGroupLimit?: number): Array<Array<T>> {
        const arrayLength = array.length;
        const elementsToPickNum = eachGroupLimit ? Math.min(groupsNum * eachGroupLimit, arrayLength) : arrayLength;

        const arrayCopy = array.slice();
        const result: Array<Array<T>> = [];
        let insertGroupIndex = 0;

        for (let i = 0; i < elementsToPickNum; i++) {
            const indexToPick = MainService.getRandomNumber(arrayCopy.length);
            const nextEl = arrayCopy[indexToPick];

            arrayCopy.splice(indexToPick, 1);
            if (result[insertGroupIndex]) {
                result[insertGroupIndex].push(nextEl);
            } else {
                result[insertGroupIndex] = [nextEl];
            }
            insertGroupIndex = (insertGroupIndex + 1) % groupsNum;
        }

        return result;
    }
}
