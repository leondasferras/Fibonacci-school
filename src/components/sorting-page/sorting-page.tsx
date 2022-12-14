import { useEffect, useState, useRef } from "react";
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
import "../../utils/sort-by";


const createRandomArr = () => {
  const arrLength = Math.floor(Math.random() * 15 + 3);
  let result = Array.from({ length: arrLength }, () => Math.floor(Math.random() * 100));

  return result;
};



export const SortingPage: React.FC = () => {
  const [arrayToRender, setArrayToRender] = useState<
    Array<{ el: number; state: ElementStates }>
  >([]);
  const [sortMode, setSortMode] = useState("select");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDirection, setCurrentDirection] = useState<"ascending" | "descending">();
  const sourceArray = useRef<number[]>([]);


  useEffect(() => {
    defineArray();
  }, []);

  const handleRadioInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSortMode(e.target.value);
  };


  const defineArray = () => {
    sourceArray.current = createRandomArr();

    setArrayToRender(
      Array.from(sourceArray.current, (el) => ({
        el: el,
        state: ElementStates.Default,
      }))
    );
  };


  const handleSelectionSort = async (direction: Direction) => {
    setIsLoading(true);

    const sortedArray = arrayToRender;
    let targetIndex;
    let sortByResult = sourceArray.current.sortBySelection(direction);

    console.log(sortByResult);

    for (let i = 0; i < sortedArray.length; i++) {
      targetIndex = i;
      await timeout(SHORT_DELAY_IN_MS);
      sortedArray[i].state = ElementStates.Changing;
      setArrayToRender([...sortedArray]);

      const step = sortByResult.steps[i];
      const el1 = step[0];
      const el2 = step[1];

      for (let j = i + 1; j < sortedArray.length; j++) {
        await timeout(SHORT_DELAY_IN_MS);
        sortedArray[j].state = ElementStates.Changing;
        setArrayToRender([...sortedArray]);

        let isFits = direction === Direction.Ascending
          ? sortedArray[j].el < sortedArray[targetIndex].el
          : sortedArray[j].el > sortedArray[targetIndex].el;

        if (isFits) {
          if (targetIndex != i) {
            sortedArray[targetIndex].state = ElementStates.Default;
          }
          targetIndex = j;
          sortedArray[targetIndex].state = ElementStates.Changing;
        }
        else {
          sortedArray[j].state = ElementStates.Default;
        }

        await timeout(SHORT_DELAY_IN_MS);
        setArrayToRender([...sortedArray]);
      }

      await timeout(SHORT_DELAY_IN_MS);
      sortedArray[i].state = ElementStates.Default;

      swap(el1, el2, sortedArray);

      sortedArray[el2].state = ElementStates.Modified;
      setArrayToRender([...sortedArray]);
      await timeout(SHORT_DELAY_IN_MS);
    }

    setIsLoading(false);
  };

  const handleBubbleSort = async (direction: Direction) => {
    setIsLoading(true);
    const sortedArray = arrayToRender;
    let sortByResult = sourceArray.current.sortByBubble(direction);

    for (let index = 0; index < sortByResult.steps.length; index++) {
      let step = sortByResult.steps[index];
      let el1 = step.indexes[0];
      let el2 = step.indexes[1];

      sortedArray[el1].state = ElementStates.Changing;
      sortedArray[el2].state = ElementStates.Changing;
      setArrayToRender([...sortedArray]);
      await timeout(SHORT_DELAY_IN_MS);

      if (step.needToSwap) {
        swap(el1, el2, sortedArray);
      }

      sortedArray[el1].state = index == sortByResult.steps.length - 1 ? ElementStates.Modified : ElementStates.Default;
      sortedArray[el2].state = step.isLastInCycle ? ElementStates.Modified : ElementStates.Default;
      setArrayToRender([...sortedArray]);
      await timeout(SHORT_DELAY_IN_MS);
    }

    setIsLoading(false);
  };

  const handleSorting = (direction: Direction) => {
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
            onClick={() => handleSorting(Direction.Ascending)}
            sorting={Direction.Ascending}
            text="По возрастанию"
            isLoader={isLoading && currentDirection === Direction.Ascending}
            disabled={isLoading && currentDirection !== Direction.Ascending}
          />
          <Button
            onClick={() => handleSorting(Direction.Descending)}
            sorting={Direction.Descending}
            text="По убыванию"
            isLoader={isLoading && currentDirection === Direction.Descending}
            disabled={isLoading && currentDirection !== Direction.Descending}
          />
        </div>
        <Button onClick={defineArray} text="Новый массив" disabled={isLoading} />
      </div>
      <div className={styles.graph}>
        {arrayToRender.map((n, i) => (
          <Column index={n.el} key={i} state={n.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
