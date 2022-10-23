import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/timeout";

export const QueuePage: React.FC = () => {
  const DefaultArray = Array.from({length:7}, (v,i) =>  ({el:'', state:ElementStates.Default, isTail:false, isHead:false})   )
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queueArray, setQueueArray] = useState<
    Array<{ el: number | string; state: ElementStates; isTail:boolean; isHead:boolean }>
  >(DefaultArray);

 

  const handleAddElement = async() => {
    const tempArray = queueArray
    const n = tempArray.length
    const targetElement = tempArray.reverse().findIndex((item) => item.el !== '')
    tempArray.reverse()
    if (targetElement === -1) {tempArray[0].el = inputValue }
    else {tempArray[n-targetElement].el = inputValue }
    setQueueArray([...tempArray])
  }


  const handleDeleteElement = async() => {
    const tempArray = queueArray
    const targetElement = tempArray.findIndex((item) => item.el !== '')
    tempArray[targetElement].el = ''
    setQueueArray([...tempArray])
  }
  const handleResetQueue = async() => {

  }

  



  return (
    <SolutionLayout title="Очередь">
      <div className={styles.buttonsWrapper}>
        <div className={styles.inputWrapper}>
          <Input
            isLimitText={true}
            type="text"
            maxLength={4}
            getInputValue={setInputValue}
            value={inputValue}
          />
          <Button
            text="Добавить"
            onClick={handleAddElement}
            disabled={!inputValue || isLoading ||  queueArray[queueArray.length-1].el !== ''}
            isLoader={isLoading}
          />
          <Button
            text="Удалить"
            onClick={handleDeleteElement}
            disabled={isLoading  }
          />
        </div>
        <Button
          text="Очистить"
          onClick={handleResetQueue}
          disabled={isLoading || queueArray.length < 1}
        />
      </div>

      <div className={styles.circlesWrapper}>
        {queueArray.map((el, i) => {
          return (
            <Circle
              extraClass="mr-10"
              letter={el.el}
              state={el.state}
              key={i}
              index={i}
              head={el.state === ElementStates.Changing ? "top" : ""}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
