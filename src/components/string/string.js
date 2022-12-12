// import { swap } from "../../utils/swap"
const swap = (el1, el2, arr) => {
  [arr[el1], arr[el2]] = [arr[el2], arr[el1]];
};



const reverseString = (string) => {
  const stringArray = [...string];
  let start = 0;
  let end = stringArray.length - 1;

  let result = [];

  while (start < end) {
    swap(start, end, stringArray);
    result.push([...stringArray]);

    start++;
    end--;
  }

  return result
}


const reverseStringNew = (string) => {
  const stringArray = [...string];
  let start = 0;
  let end = stringArray.length - 1;

  let result = [];

  while (start < end) {
    swap(start, end, stringArray);
    result.push([start, end]);

    start++;
    end--;
  }

  return result
}



//console.log(reverseString("123456"));

console.log(reverseStringNew("123456"));

// describe