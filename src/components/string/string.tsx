import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { timeout } from "../../utils/timeout";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/swap";
import { ICircleElement } from "../list-page/list-page";


// const reverseString = (string:string) => {
//   const stringArray = [...string];
//   //const stringArray = string.split("");
//   let start = 0;
//   let end = stringArray.length - 1;

//   let result = [];

//   while (start < end) {
//     swap(start, end, stringArray);
//     result.push([start, end]);

//     start++;
//     end--;
//   }

//   return result
// }



export const StringComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [string, setString] = useState<string>("");
  const [circles, setCircles] = useState<Array<ICircleElement>>([]);

  const reverseCircles = async () => {
    setIsLoading(true);
    let circlesWithStatus: Array<ICircleElement> = [];
    string.split("").forEach((el) => {
      circlesWithStatus.push({ el: el, state: ElementStates.Default });
    });
    setCircles(circlesWithStatus);
    await timeout(DELAY_IN_MS);

    let start = 0;
    let end = circlesWithStatus.length - 1;



    // let instr = reverseString(string);

    // for (let index = 0; index < instr.length; index++) {
    //   const step = instr[index];
    //   let start = step[0];
    //   let end = step[1];


    //   circlesWithStatus[start].state = ElementStates.Changing;
    //   circlesWithStatus[end].state = ElementStates.Changing;
    //   await timeout(DELAY_IN_MS);
    //   setCircles([...circlesWithStatus]);
    //   swap(start, end, circlesWithStatus);
    //   await timeout(DELAY_IN_MS);
    //   circlesWithStatus[start].state = ElementStates.Modified;
    //   circlesWithStatus[end].state = ElementStates.Modified;
    //   setCircles([...circlesWithStatus]);
    // }


    while (start <= end) {
      circlesWithStatus[start].state = ElementStates.Changing;
      circlesWithStatus[end].state = ElementStates.Changing;
      await timeout(DELAY_IN_MS);
      setCircles([...circlesWithStatus]);
      swap(start, end, circlesWithStatus);
      await timeout(DELAY_IN_MS);
      circlesWithStatus[start].state = ElementStates.Modified;
      circlesWithStatus[end].state = ElementStates.Modified;
      setCircles([...circlesWithStatus]);

      start++;
      end--;
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.formContainer}>
        <Input
          isLimitText={true}
          type="text"
          maxLength={11}
          getInputValue={setString}
        ></Input>
        <Button
          onClick={() => {
            reverseCircles();
          }}
          text="Развернуть"
          isLoader={isLoading}
          disabled={!string}
        ></Button>
      </div>
      <div className={`${styles.circlesContainer} mt-10 `}>
        {circles.map((el, i) => (
          <Circle
            extraClass="mr-4"
            key={i.toString()}
            state={el.state}
            letter={el.el}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
