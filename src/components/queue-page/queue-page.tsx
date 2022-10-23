import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/timeout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const DefaultArray = Array.from({ length: 7 }, (v, i) => ({
    el: "",
    state: ElementStates.Default,
    isTail: false,
    isHead: false,
  }));
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queueArray, setQueueArray] = useState<
    Array<{
      el: number | string;
      state: ElementStates;
      isTail: boolean;
      isHead: boolean;
    }>
  >(DefaultArray);

  const handleAddElement = async () => {
    setIsLoading(true);
    const tempArray = queueArray;
    const n = tempArray.length;

    const moveTail = () => {
      const currentTail = tempArray.findIndex((item) => item.isTail === true);
      tempArray[currentTail].isTail = false;
      if (tempArray[currentTail + 1].el)
        tempArray[currentTail + 1].isTail = true;
    };

    const targetElement = tempArray
      .reverse()
      .findIndex((item) => item.el !== "");
    tempArray.reverse();
    if (targetElement === -1) {
      tempArray[0].state = ElementStates.Changing;
      tempArray[0].el = inputValue;
      tempArray[0].isHead = true;
      tempArray[0].isTail = true;

      setQueueArray([...tempArray]);
      await timeout(SHORT_DELAY_IN_MS);
      tempArray[0].state = ElementStates.Default;
    } else {
      tempArray[n - targetElement].state = ElementStates.Changing;
      tempArray[n - targetElement].el = inputValue;
      moveTail();
      setQueueArray([...tempArray]);
      await timeout(SHORT_DELAY_IN_MS);
      tempArray[n - targetElement].state = ElementStates.Default;
    }

    setQueueArray([...tempArray]);
    setInputValue("");
    setIsLoading(false);
  };

  const handleDeleteElement = async () => {
    setIsLoading(true);
    const tempArray = queueArray;
    const targetElement = tempArray.findIndex((item) => item.el !== "");
    const moveHead = () => {
      const currentHead = tempArray.findIndex((item) => item.isHead === true);
      tempArray[currentHead].isHead = false;
      if (tempArray[currentHead + 1]?.el)
        tempArray[currentHead + 1].isHead = true;
    };

    tempArray[targetElement].state = ElementStates.Changing;
    setQueueArray([...tempArray]);
    await timeout(SHORT_DELAY_IN_MS);

    tempArray[targetElement].el = "";
    tempArray[targetElement].isTail = false;
    tempArray[targetElement].state = ElementStates.Default;

    moveHead();
    setQueueArray([...tempArray]);
    setIsLoading(false);
  };

  const handleResetQueue = async () => {
    setQueueArray([...DefaultArray]);
  };

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
            disabled={isLoading}
          />
          <Button
            text="Добавить"
            onClick={handleAddElement}
            disabled={
              !inputValue ||
              isLoading ||
              queueArray[queueArray.length - 1].el !== ""
            }
            isLoader={isLoading}
          />
          <Button
            text="Удалить"
            onClick={handleDeleteElement}
            disabled={isLoading || !queueArray.some((el) => el.el !== "")}
          />
        </div>
        <Button
          text="Очистить"
          onClick={handleResetQueue}
          disabled={isLoading || !queueArray.some((el) => el.el !== "")}
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
              head={el.isHead ? "Head" : ""}
              tail={el.isTail ? "Tail" : ""}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
