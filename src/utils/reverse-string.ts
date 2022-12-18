import { swap } from "./swap";

export const reverseString = (string: string) => {
  const stringArray = [...string];
  let start = 0;
  let end = stringArray.length - 1;

  let steps = [];

  while (start <= end) {
    swap(start, end, stringArray);
    steps.push([start, end]);

    start++;
    end--;
  }

  let result = {
    steps: steps,
    result: stringArray.join(""),
  };

  return result;
};
