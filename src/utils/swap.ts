import { ICircleElement } from "../components/list-page/list-page";
export const swap = (el1:number, el2:number, arr:Array<ICircleElement> ):void => {
  [arr[el1], arr[el2]] = [arr[el2], arr[el1]];
}