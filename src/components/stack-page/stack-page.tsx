import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/timeout";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stackArray, setStackArray] = useState<
    Array<{ el: number | string; state: ElementStates }>
  >([]);

  const handleAddElement = async () => {
    setIsLoading(true);
    setInputValue("");
    const tempArray = stackArray;
    if (tempArray.length > 0)
      tempArray[tempArray.length - 1].state = ElementStates.Default;
    tempArray.push({ el: inputValue, state: ElementStates.Default });
    setStackArray([...tempArray]);
    await timeout(500);
    tempArray[tempArray.length - 1].state = ElementStates.Changing;
    setStackArray([...tempArray]);
    setIsLoading(false);
  };

  const handleDeleteElement = async () => {
    setIsLoading(true);
    const tempArray = stackArray;
    tempArray.pop();
    setStackArray([...tempArray]);
    await timeout(500);
    if (tempArray.length > 0)
      tempArray[tempArray.length - 1].state = ElementStates.Changing;
    setStackArray([...tempArray]);
    setIsLoading(false);
  };

  const handleResetStack = () => {
    setStackArray([]);
  };

  return (
    <SolutionLayout title="Стек">
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
            disabled={!inputValue || isLoading}
            isLoader={isLoading}
          />
          <Button
            text="Удалить"
            onClick={handleDeleteElement}
            disabled={isLoading || stackArray.length < 1}
          />
        </div>
        <Button
          text="Очистить"
          onClick={handleResetStack}
          disabled={isLoading || stackArray.length < 1}
        />
      </div>

      <div className={styles.circlesWrapper}>
        {stackArray.map((el, i) => {
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
