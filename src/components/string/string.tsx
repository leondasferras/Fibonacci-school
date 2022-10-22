import { ReactElement, useState, FC, useRef, ReactComponentElement } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { timeout } from "../../utils/timeout";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/swap";

export const StringComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [string, setString] = useState<string>('');
  const [circles, setCircles] = useState<Array<any>>([]);

  

  const reverseCircles = async () => {
    let circlesWithStatus:Array<any> = [];
    string.split('').forEach((el) => {circlesWithStatus.push({el:el,state:ElementStates.Default})})
    setCircles(circlesWithStatus)
    await timeout(DELAY_IN_MS)
    
    let start = 0;
    let end = circlesWithStatus.length-1;

      while (start<=end) {
      circlesWithStatus[start].state = ElementStates.Changing;
      circlesWithStatus[end].state = ElementStates.Changing;
      await timeout(1500)
      setCircles([...circlesWithStatus])
      swap(start,end,circlesWithStatus)
      await timeout(1500)
      circlesWithStatus[start].state = ElementStates.Modified;
      circlesWithStatus[end].state = ElementStates.Modified;
      setCircles([...circlesWithStatus])
      
      start++;
      end--;
    }
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.formContainer}>
        <Input
          isLimitText={true}
          type="text"
          maxLength={12}
          getInputValue={setString}
        ></Input>
        <Button
          onClick={() => {
            setIsLoading(true);
            reverseCircles()
          }}
          text="Развернуть"
        ></Button>
      </div>
      <div className={styles.circlesContainer}>
        {circles.map(el => <Circle state={el.state} letter={el.el}/>) }
      </div>
    </SolutionLayout>
  );
};
