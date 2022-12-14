import { Direction } from "../types/direction";
import { swap } from "./swap";

declare global {
    interface Array<T> {
        sortBySelection(direction: Direction): ISortByResult;

        sortByBubble(direction: Direction): ISortByBubbleResult;
    }
}

interface ISortByResult {
    steps: number[][];
    result: any[];
}

interface ISortByBubbleResult {
    steps: {
        indexes: number[],
        needToSwap: boolean,
        isLastInCycle: boolean
    }[];
    result: any[];
}


Array.prototype.sortByBubble = function (direction) {
    let steps = [];

    for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1 - i; j++) {
            let el1 = j;
            let el2 = j + 1;
            let isLastInCycle = el2 === this.length - 1 - i;
            let isFit = direction === Direction.Ascending
                ? this[el1] > this[el2]
                : this[el1] < this[el2];

            let step = {
                indexes: [el1, el2],
                needToSwap: false,
                isLastInCycle: isLastInCycle
            };

            if (isFit) {
                swap(el1, el2, this);
                step.needToSwap = true;
            }

            steps.push(step);
        }
    }

    const result = {
        steps: steps,
        result: this,
    };

    return result;
}

Array.prototype.sortBySelection = function (direction) {
    let targetValue;
    let steps = [];

    for (let i = 0; i < this.length; i++) {
        targetValue = i;

        for (let j = i + 1; j < this.length; j++) {
            if (
                direction === Direction.Ascending
                    ? this[j] < this[targetValue]
                    : this[j] > this[targetValue]
            ) {
                targetValue = j;
            }
        }

        swap(targetValue, i, this);
        steps.push([targetValue, i]);
    }

    const result = {
        steps: steps,
        result: this,
    };

    return result;
}





export { };