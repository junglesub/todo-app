import { render, screen } from "@testing-library/react";
import App from "./App";

// 지금 당장은 테스트 파일마다 만들어야함.
// 나중에는 하나의 파일로 만들 수도 있음.
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() }); // Enzyme 설정 ("configure")

describe("Todo Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  test("render the title of todo", () => {
    // 하나의 테스트 유닛
    expect(wrapper.find("h1").text()).toContain("Todo App"); // h1 태그를 찾아 안에 Todo App 이 있는지 확인.
  });

  test("render a input for new todo item", () => {
    expect(wrapper.find("#todo-item-input").exists()).toEqual(true); // 존재 하는지 확인.
  });

  test("rendered input text should be empty", () => {
    expect(wrapper.find("#todo-item-input").prop("value")).toEqual(""); // 안에 있는 기본 값이 비어있는지 확인
  });

  test("render a button with text of 'create'", () => {
    expect(wrapper.find("#create-btn").text()).toBe("Create");
  });
});

describe("Test Todo Item", () => {
  const wrapper = shallow(<App />);
  const input = wrapper.find("#todo-item-input");

  describe("Add Todo", () => {
    test("enter a text to input", () => {
      input.simulate("change", { target: { value: "Test Todo" } });
    });
    test("check if the value changed", () => {
      expect(wrapper.find("#todo-item-input").prop("value")).toEqual(
        "Test Todo"
      );
    });
    test("create button clears input", () => {
      wrapper.find("#create-btn").simulate("click");
      expect(wrapper.find("#todo-item-input").prop("value")).toEqual("");
    });
    test("create adds new todo item to the list", () => {
      expect(wrapper.find("#todo-list").text()).toContain("Test Todo");
    });
  });

  describe("Remove Todo", () => {
    test("click existing data to remove", () => {
      wrapper.find("#todo-list div").simulate("click");
      expect(wrapper.find("#todo-list").text()).toBe("");
    });
  });
});
