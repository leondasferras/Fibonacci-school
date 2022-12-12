import renderer from "react-test-renderer";
import { Circle } from "./circle";


describe("Тест рендера компонента Circle:", ()=> {
  it("Circle без буквы рендерится без ошибок", () => {
    const tree = renderer.create(<Circle/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с буквами рендерится без ошибок", () => {
    const tree = renderer.create(<Circle letter={'ab'}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с текстом в head рендерится без ошибок", () => {
    const tree = renderer.create(<Circle head={'ab'}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с react-элементом в head рендерится без ошибок", () => {
    const tree = renderer.create(<Circle head={
      <Circle isSmall={true} letter={'ab'} />
    }/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с текстом в tail рендерится без ошибок", () => {
    const tree = renderer.create(<Circle tail={"abc"}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с react-элементом в tail рендерится без ошибок", () => {
    const tree = renderer.create(<Circle tail={
      <Circle isSmall={true} letter={'ab'} />
    }/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с index рендерится без ошибок", () => {
    const tree = renderer.create(<Circle index={5}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с isSmall=true рендерится без ошибок", () => {
    const tree = renderer.create(<Circle isSmall={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с состоянием default рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state="default"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с состоянием changing рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state="changing"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Circle с состоянием modified рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state="modified"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

})