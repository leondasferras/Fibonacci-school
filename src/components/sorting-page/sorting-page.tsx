import { ChangeEventHandler, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { swap } from "../../utils/swap";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/timeout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [arrayToRender, setArrayToRender] = useState<
    Array<{ el: number; state: ElementStates }>
  >([]);
  const [sortMode, setSortMode] = useState("select");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDirection, setCurrentDirection] = useState<
    "ascending" | "descending"
  >();

  useEffect(() => {
    randomArr();
  }, []);

  const handleRadioInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSortMode(e.target.value);
  };

  const randomArr = () => {
    const arrLength = Math.floor(Math.random() * 15 + 3);
    setArrayToRender(
      Array.from({ length: arrLength }, () => ({
        el: Math.floor(Math.random() * 100),
        state: ElementStates.Default,
      }))
    );
  };

  const handleSelectionSort = async (direction: "ascending" | "descending") => {
    setIsLoading(true);
    const sortedArray = arrayToRender;
    let targetValue;
    for (let i = 0; i < sortedArray.length; i++) {
      targetValue = i;
      await timeout(500);
      sortedArray[i].state = ElementStates.Changing;
      setArrayToRender([...sortedArray]);
      for (let j = i + 1; j < sortedArray.length; j++) {
        await timeout(500);
        sortedArray[j].state = ElementStates.Changing;
        setArrayToRender([...sortedArray]);

        if (
          direction === "ascending"
            ? sortedArray[j].el < sortedArray[targetValue].el
            : sortedArray[j].el > sortedArray[targetValue].el
        ) {
          sortedArray[targetValue].state = ElementStates.Default;
          sortedArray[i].state = ElementStates.Changing;
          targetValue = j;
          sortedArray[targetValue].state = ElementStates.Changing;
          setArrayToRender([...sortedArray]);
        }

        await timeout(500);
        sortedArray[j].state = ElementStates.Default;
        sortedArray[targetValue].state = ElementStates.Changing;
        setArrayToRender([...sortedArray]);
      }
      await timeout(500);
      sortedArray[i].state = ElementStates.Default;
      sortedArray[targetValue].state = ElementStates.Modified;
      swap(targetValue, i, sortedArray);
      setArrayToRender([...sortedArray]);
      await timeout(500);
    }
    setIsLoading(false);
  };

  const handleBubbleSort = async (direction: "ascending" | "descending") => {
    setIsLoading(true);
    const sortedArray = arrayToRender;
    let n = sortedArray.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        await timeout(500);
        sortedArray[j].state = ElementStates.Changing;
        sortedArray[j + 1].state = ElementStates.Changing;
        setArrayToRender([...sortedArray]);
        if (
          direction === "ascending"
            ? sortedArray[j].el > sortedArray[j + 1].el
            : sortedArray[j].el < sortedArray[j + 1].el
        ) {
          swap(j, j + 1, sortedArray);
        }

        await timeout(500);
        sortedArray[j].state = ElementStates.Default;
        sortedArray[j + 1].state = ElementStates.Default;
        setArrayToRender([...sortedArray]);
      }

      await timeout(500);
      sortedArray[n - 1 - i].state = ElementStates.Modified;
      setArrayToRender([...sortedArray]);
    }
    sortedArray[0].state = ElementStates.Modified;
    setArrayToRender([...sortedArray]);

    setIsLoading(false);
  };

  const handleSorting = (direction: "ascending" | "descending") => {
    setCurrentDirection(direction);
    return sortMode === "select"
      ? handleSelectionSort(direction)
      : handleBubbleSort(direction);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttons}>
        <div className={styles.radioWrapper}>
          <RadioInput
            onChange={handleRadioInput}
            value="select"
            label="Выбор"
            name="method"
            defaultChecked
            disabled={isLoading}
          />
          <RadioInput
            onChange={handleRadioInput}
            value="bubble"
            label="Пузырёк"
            name="method"
            disabled={isLoading}
          />
        </div>
        <div className={styles.methodButtonsWrapper}>
          <Button
            onClick={() => handleSorting("ascending")}
            sorting={Direction.Ascending}
            text="По возрастанию"
            isLoader={isLoading && currentDirection === "ascending"}
            disabled={isLoading && currentDirection !== "ascending"}
          />
          <Button
            onClick={() => handleSorting("descending")}
            sorting={Direction.Descending}
            text="По убыванию"
            isLoader={isLoading && currentDirection === "descending"}
            disabled={isLoading && currentDirection !== "descending"}
          />
        </div>
        <Button onClick={randomArr} text="Новый массив" disabled={isLoading} />
      </div>
      <div className={styles.graph}>
        {arrayToRender.map((n, i) => (
          <Column index={n.el} key={i} state={n.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
