import { ICircleElement } from "../components/list-page/list-page";
import { ElementStates } from "../types/element-states";

export const circleObj = (item:string):ICircleElement => {
  const circle = {  
    el:item,
    state:ElementStates.Default
  }
 return circle
}


interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  public container: T[] = [];

  push = (item: T): void => {
    this.container.push(item)
  };

  pop = (): void => {
    this.container.pop()
  };

  peak = (): T | null => {
    return this.container.length? this.container[this.getSize()-1] : null

  };

  getSize = () => this.container.length;

  clear= () => (this.container.length = 0);
}