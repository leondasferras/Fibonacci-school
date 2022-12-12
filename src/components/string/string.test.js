import { reverseString } from "../../utils/reverse-string";

describe("Тестирование алгоритма разворота строки:", () => {
  it("С чётным количеством символов", () => {
    let reverseStringOperation = reverseString("12345678");
    expect(reverseStringOperation.result).toBe("87654321");
  });

  it("С нечетным количеством символов", () => {
    let reverseStringOperation = reverseString("12345");
    expect(reverseStringOperation.result).toBe("54321");
  });

  it("С одним символом", () => {
    let reverseStringOperation = reverseString("1");
    expect(reverseStringOperation.result).toBe("1");
  });

  it("Пустую строку", () => {
    let reverseStringOperation = reverseString("");
    expect(reverseStringOperation.result).toBe("");
  });
});
