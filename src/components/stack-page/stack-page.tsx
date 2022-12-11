import { useState, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "../../classes/stack";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/timeout";
import { circleObj } from "../../classes/stack";
import { ICircleElement } from "../list-page/list-page";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stackArray, setStackArray] = useState<Array<ICircleElement>>([]);

  const stack = useMemo(() => new Stack<ICircleElement>(), []);

  const handleAddElement = async () => {
    setIsLoading(true);
    setInputValue("");
    if (stack.getSize()) {
      stack.peak()!.state = ElementStates.Default;
      stack.peak()!.head = "";
    }
    stack.push(circleObj(inputValue));
    setStackArray([...stack.container]);
    await timeout(500);
    stack.peak()!.state = ElementStates.Changing;
    stack.peak()!.head = "top";
    setStackArray([...stack.container]);
    setIsLoading(false);
  };

  const handleDeleteElement = async () => {
    setIsLoading(true);
    stack.pop();
    setStackArray([...stack.container]);
    await timeout(500);
    if (stack.getSize()) {
      stack.peak()!.state = ElementStates.Changing;
      stack.peak()!.head = "top";
    }
    setStackArray([...stack.container]);
    setIsLoading(false);
  };

  const handleResetStack = () => {
    stack.clear();
    setStackArray([...stack.container]);
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
              head={el.head}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
