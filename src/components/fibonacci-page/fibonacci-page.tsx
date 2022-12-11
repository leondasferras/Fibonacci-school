import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { timeout } from "../../utils/timeout";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState('');
  const [numbersArray, setNumbersArray] = useState<Array<number>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFibonacciNumbers = async () => {
    setIsLoading(true);
    const fibonacciArray: Array<number> = [0];
    setNumbersArray([...fibonacciArray]);
    await timeout(SHORT_DELAY_IN_MS);
    fibonacciArray.push(1);
    setNumbersArray([...fibonacciArray]);
    await timeout(SHORT_DELAY_IN_MS);

    for (let i = 2; i <= Number(number); i++) {
      fibonacciArray.push(fibonacciArray[i - 2] + fibonacciArray[i - 1]);
      setNumbersArray([...fibonacciArray]);
      await timeout(SHORT_DELAY_IN_MS);
    }

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.formContainer}>
        <Input
          isLimitText={true}
          max={19}
          type={"number"}
          getInputValue={setNumber}
          placeholder={"Введите число"}
        ></Input>
        <Button
          onClick={handleFibonacciNumbers}
          text="Развернуть"
          isLoader={isLoading}
          disabled={Number(number) > 19 || Number(number) < 1 || !number}
        ></Button>
      <Button
        text="Кнопка"
        isLoader={false}
        onClick={()=>alert("кнопка работает")}
      ></Button>
      </div>
      <div className={`${styles.circlesContainer} mt-20`}>
        {numbersArray.map((n, i) => (
          <div
            className={`${styles.numberedCircle} mb-6 mr-5 "`}
            key={i.toString()}
          >
            <Circle extraClass="mb-2" letter={n} />
            <span>{i}</span>
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
