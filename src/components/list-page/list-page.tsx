import {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {

  const DefaultArray = Array.from({ length: 7 }, (v, i) => ({
    el: "",
    state: ElementStates.Default,
    isTail: false,
    isHead: false,
  }));


  const [number, setNumber] = useState();
  const [index, setIndex] = useState();
  const [array, setArray] = useState([]);






  return (
    <SolutionLayout title="Связный список">
      <div className={styles.buttonsWrapper}>   
        <Input maxLength={4} isLimitText={true} getInputValue={setNumber} placeholder='Введите значение'/>
        <Button text="Добавить в head"/>
        <Button text="Добавить в tail"/>
        <Button text="Удалить из head"/>
        <Button text="Удалить из tail"/>
        <Input max={9} type="number" getInputValue={setIndex} placeholder='Введите индекс'/>
        <Button text="Добавить по индексу"/>
        <Button text="Удалить по индексу"/>

      </div>
      <div className={styles.circlesWrapper}>
        {DefaultArray.map((item) => 
        <>
        <Circle letter={item.el}/>

        </>
        )}
      </div>
    </SolutionLayout>
  );
};
