import { swap } from "../../utils/swap"

const reverseString = (string) => {
  const stringArray = [...string];
  let start = 0;
  let end = stringArray.length - 1;

  let result = [];

  while (start <= end) {
    swap(start, end, stringArray);
    result.push(stringArray);

    start++;
    end--;
  }

  return result
}

// describe