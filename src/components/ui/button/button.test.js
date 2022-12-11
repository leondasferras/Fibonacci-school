import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Тест рендера кнопки:", () => {
  it("Кнопка с текстом рендерится без ошибок", () => {
    const tree = renderer.create(<Button text="Кнопка"></Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка без текста рендерится без ошибок", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Заблокированная кнопка рендерится без ошибок", () => {
    const tree = renderer
      .create(<Button text="Кнопка" disabled={true}></Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка с индикацией загрузки рендерится без ошибок", () => {
    const tree = renderer
      .create(<Button text="Кнопка" isLoader={true}></Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Нажатие на кнопку вызывает корректный alert", () => {
    window.alert = jest.fn();

    const buttonTextOnClick = "Кнопка работает";

    // Рендерим компонент
    render(
      <Button text="Кнопка" onClick={() => alert(buttonTextOnClick)}></Button>
    );

    // Находим элемент кнопки
    const button = screen.getByRole("button");

    // Имитируем нажатие на ссылку
    fireEvent.click(button);

    // Проверяем, что alert сработал с правильным текстом
    expect(window.alert).toHaveBeenCalledWith(buttonTextOnClick);
  });
});