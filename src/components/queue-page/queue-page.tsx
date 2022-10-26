import { useState, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Queue } from "../../classes/queue";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/timeout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ICircleElement } from "../list-page/list-page";

export const QueuePage: React.FC = () => {
  const queue = useMemo(() => new Queue<string>(7), []);
  const DefaultArray = Array.from({ length: 7 }, (v, i) => ({
    el: "",
    state: ElementStates.Default,
    tail: "",
    head: "",
  }));

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queueArray, setQueueArray] =
    useState<Array<ICircleElement>>(DefaultArray);

  const handleAddElement = async () => {
    setIsLoading(true);
    const tempArr = queueArray;
    tempArr[queue.getHead()].head = "head";
    tempArr[queue.getTail()].tail = "tail";
    if (queue.getTail() > 0) {
      tempArr[queue.getTail() - 1].tail = "";
    }
    queue.enqueue(inputValue);
    tempArr[queue.getTail() - 1].el = queue.container[queue.getTail() - 1]!;
    tempArr[queue.getTail() - 1].state = ElementStates.Changing;
    await timeout(SHORT_DELAY_IN_MS);
    tempArr[queue.getTail() - 1].state = ElementStates.Default;
    setQueueArray([...tempArr]);
    setInputValue("");
    setIsLoading(false);
  };

  const handleDeleteElement = async () => {
    setIsLoading(true);
    const tempArray = queueArray;
    tempArray[queue.getHead()].state = ElementStates.Changing
    await timeout(SHORT_DELAY_IN_MS)
    tempArray[queue.getHead()].state = ElementStates.Default
    tempArray[queue.getHead()].el = "";
    tempArray[queue.getHead()].head = "";

    if (queue.getTail() - queue.getHead() === 1) {
      queue.clear();
      setQueueArray([...DefaultArray]);
    } else {
      queue.dequeue();
      tempArray[queue.getHead()].head = "head";
      setQueueArray([...tempArray]);
    }
    setIsLoading(false);
  };

  const handleResetQueue = async () => {
    queue.clear();
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
              head={el.head}
              tail={el.tail}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
