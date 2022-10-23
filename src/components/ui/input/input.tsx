import {ChangeEventHandler} from "react";
import styles from "./input.module.css";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  extraClass?: string;
  isLimitText?: boolean;
  getInputValue: (text:any)=>void;
}

export const Input: React.FC<InputProps> = ({
  placeholder = "Введите текст",
  extraClass = "",
  type = "text",
  maxLength,
  max,
  isLimitText = false,
  getInputValue,
  value,
  ...rest
}) => {
  const limitText =
    type === "text"
      ? `Максимум — ${maxLength} символов`
      : `Максимальное число — ${max}`;
  
const handleInput:ChangeEventHandler<HTMLInputElement> = (e) => {
  getInputValue(e.target.value)
}


  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text_type_input text_color_input`}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        max={max}
        onChange={handleInput}
        value = {value}
        {...rest}
      />
      {isLimitText && (
        <span
          className={`${styles.limit}text text_type_input-lim text_color_input mt-2 ml-8 `}
        >
          {limitText}
        </span>
      )}
    </div>
  );
};
