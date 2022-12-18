export const swap = (el1:number, el2:number, arr:Array<any> ):void => {
  [arr[el1], arr[el2]] = [arr[el2], arr[el1]];
}