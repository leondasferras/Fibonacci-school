import { useEffect, useState, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { timeout } from "../../utils/timeout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "../../classes/linkedList";
import { time } from "console";

export interface ICircleElement {
  el: number | string;
  state: ElementStates;
  head?: string | number | React.ReactElement | null;
  tail?: string | React.ReactElement | null;
}

export const ListPage: React.FC = () => {
  const [number, setNumber] = useState<number | string>("");
  const [index, setIndex] = useState("");
  const [array, setArray] = useState<Array<ICircleElement>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultNumArray: Array<string | number> = [0, 34, 8, 1];

  const setDefaultArray = () => {
    const defaultArray = defaultNumArray.reverse().map(
      (n): ICircleElement => ({
        el: n,
        state: ElementStates.Default,
        head: null,
        tail: null,
      })
    );
    defaultArray[0].head = "head";
    defaultArray[defaultArray.length - 1].tail = "tail";
    setArray(defaultArray);
  };

  useEffect(() => {
    setDefaultArray();
  }, []);

  const linkedList = useMemo(
    () => new LinkedList<string | number>(defaultNumArray),
    []
  );

  const addToHead = async () => {
    setIsLoading(true);
    const tempArr = array;
    linkedList.prepend(number);
    tempArr[0].head = (
      <Circle
        isSmall={true}
        state={ElementStates.Changing}
        letter={linkedList.getByIndex(0)!}
      />
    );
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    tempArr[0].head = null;
    setArray([...tempArr]);
    tempArr.unshift({
      el: linkedList.getByIndex(0)!,
      state: ElementStates.Modified,
      head: "head",
      tail: null,
    });
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    tempArr[0].state = ElementStates.Default;
    setNumber("");
    setIsLoading(false);
  };

  const addToTail = async () => {
    setIsLoading(true);
    const tempArr = array;
    linkedList.append(number);
    const length = linkedList.getLength();
    for (let i = 0; i < length - 1; i++) {
      tempArr[i].state = ElementStates.Changing;
      tempArr[i].head = (
        <Circle
          isSmall={true}
          state={ElementStates.Changing}
          letter={linkedList.getByIndex(length - 1)!}
        />
      );
      if (i > 0) {
        tempArr[i - 1].head = "";
        tempArr[0].head = "head";
      }
      setArray([...tempArr]);
      await timeout(SHORT_DELAY_IN_MS);
    }
    tempArr[length - 2].head = null;
    tempArr[length - 2].tail = null;
    tempArr.push({
      el: linkedList.getByIndex(length - 1)!,
      state: ElementStates.Modified,
      head: null,
      tail: "tail",
    });
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    tempArr.forEach((el) => {
      el.state = ElementStates.Default;
    });
    setNumber("");
    setIsLoading(false);
  };

  const deleteFromHead = async () => {
    setIsLoading(true);
    const tempArr = array;
    tempArr[0].tail = (
      <Circle
        isSmall={true}
        state={ElementStates.Changing}
        letter={linkedList.getByIndex(0)!}
      />
    );
    tempArr[0].el = "";
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    linkedList.deleteHead();
    tempArr.shift();
    tempArr[0].state = ElementStates.Modified;
    tempArr[0].head = "head";
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    tempArr[0].state = ElementStates.Default;
    setArray([...tempArr]);
    setIsLoading(false);
  };

  const deleteFromTail = async () => {
    setIsLoading(true);
    const tempArr = array;
    const length = linkedList.getLength();
    tempArr[length - 1].tail = (
      <Circle
        isSmall={true}
        state={ElementStates.Changing}
        letter={linkedList.getByIndex(length - 1)!}
      />
    );
    tempArr[length - 1].el = "";
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    linkedList.deleteByIndex(length - 1);
    tempArr.pop();
    tempArr[tempArr.length - 1].state = ElementStates.Modified;
    tempArr[tempArr.length - 1].tail = "tail";
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    tempArr[tempArr.length - 1].state = ElementStates.Default;
    setArray([...tempArr]);
    setIsLoading(false);
  };

  const addByIndex = async () => {
    setIsLoading(true);
    const tempArr = array;
    const length = linkedList.getLength();
    for (let i = 0; i <= Number(index); i++) {
      tempArr[i].state = ElementStates.Changing;
      tempArr[i].head = (
        <Circle isSmall={true} state={ElementStates.Changing} letter={number} />
      );
      if (i > 0) {
        tempArr[i - 1].head = "";
        tempArr[0].head = "head";
      }
      setArray([...tempArr]);
      await timeout(SHORT_DELAY_IN_MS);
    }
    tempArr[Number(index)].head = "";
    linkedList.addByIndex(number, Number(index));
    tempArr.splice(Number(index), 0, {
      el: linkedList.getByIndex(Number(index))!,
      state: ElementStates.Modified,
      head: null,
      tail: null,
    });
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    tempArr.forEach((el) => (el.state = ElementStates.Default));
    setArray([...tempArr]);
    setNumber("");
    setIsLoading(false);
  };

  const deleteByIndex = async () => {
    if (Number(index) === 0) {
      deleteFromHead();
      return;
    }
    setIsLoading(true);
    const tempArr = array;
    for (let i = 0; i <= Number(index); i++) {
      tempArr[i].state = ElementStates.Changing;
      setArray([...tempArr]);
      await timeout(SHORT_DELAY_IN_MS);
    }

    tempArr[Number(index)].tail = (
      <Circle
        isSmall={true}
        state={ElementStates.Changing}
        letter={tempArr[Number(index)].el}
      />
    );
    tempArr[Number(index)].el = "";
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    tempArr[Number(index)].tail = "";
    tempArr[Number(index)].state = ElementStates.Default;
    tempArr.splice(Number(index), 1);
    if (Number(index) === tempArr.length - 1) {
      tempArr[tempArr.length - 1].tail = "tail";
    }
    setArray([...tempArr]);
    await timeout(SHORT_DELAY_IN_MS);
    tempArr.forEach((el) => (el.state = ElementStates.Default));
    linkedList.deleteByIndex(Number(index));
    setArray([...tempArr]);
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.buttonsWrapper}>
        <Input
          maxLength={4}
          isLimitText={true}
          getInputValue={setNumber}
          value={number}
          placeholder="Введите значение"
        />
        <Button
          onClick={addToHead}
          text="Добавить в head"
          disabled={isLoading || !number ? true : undefined}
        />
        <Button
          onClick={addToTail}
          text="Добавить в tail"
          disabled={isLoading || !number ? true : undefined}
        />
        <Button
          onClick={deleteFromHead}
          text="Удалить из head"
          disabled={isLoading || array.length < 2 ? true : undefined}
        />
        <Button
          onClick={deleteFromTail}
          text="Удалить из tail"
          disabled={isLoading || array.length < 2 ? true : undefined}
        />
        <Input
          max={array.length - 1}
          type="number"
          getInputValue={setIndex}
          value={index!}
          placeholder="Введите индекс"
          isLimitText={true}
        />
        <Button
          onClick={addByIndex}
          text="Добавить по индексу"
          disabled={
            isLoading ||
            Number(index) < 0 ||
            Number(index) > array.length - 1 ||
            !number ||
            !index
              ? true
              : undefined
          }
        />
        <Button
          onClick={deleteByIndex}
          text="Удалить по индексу"
          disabled={
            isLoading ||
            !index ||
            array.length < 2 ||
            Number(index) < 0 ||
            Number(index) > array.length - 1
              ? true
              : undefined
          }
        />
      </div>
      <div className={styles.circlesWrapper}>
        {array.map((item, index) => (
          <div className={styles.circleWrapper} key={index}>
            <Circle
              state={item.state}
              letter={item.el}
              index={index}
              extraClass="mr-5 ml-5"
              tail={item.tail}
              head={item.head}
            />

            {index < array.length - 1 && (
              <ArrowIcon
                fill={
                  item.state === ElementStates.Changing ? "#D252E1" : "#0032FF"
                }
              />
            )}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
