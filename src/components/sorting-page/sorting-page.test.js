import "../../utils/sort-by";
import { Direction } from "../../types/direction";

describe("Тестирование алгоритма сортировки выбором:", () => {
  it("Корректно сортирует пустой массив", () => {
    let sortByResult = [].sortBySelection(Direction.Ascending);
    expect(sortByResult.result).toStrictEqual([]);
  });

  it("Корректно сортирует массив из одного элемента", () => {
    let sortByResult = [1].sortBySelection(Direction.Ascending);
    expect(sortByResult.result).toStrictEqual([1]);
  });

  it("Корректно сортирует массив из нескольких элементов", () => {
    let sortByResult = [8, 2, 6, 4, 5, 3, 7, 1].sortBySelection(
      Direction.Ascending
    );
    expect(sortByResult.result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe("Тестирование алгоритма сортировки пузырьком:", () => {
  it("Корректно сортирует пустой массив", () => {
    let sortByResult = [].sortByBubble(Direction.Ascending);
    expect(sortByResult.result).toStrictEqual([]);
  });

  it("Корректно сортирует массив из одного элемента", () => {
    let sortByResult = [1].sortByBubble(Direction.Ascending);
    expect(sortByResult.result).toStrictEqual([1]);
  });

  it("Корректно сортирует массив из нескольких элементов", () => {
    let sortByResult = [8, 2, 6, 4, 5, 3, 7, 1].sortByBubble(
      Direction.Ascending
    );
    expect(sortByResult.result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
