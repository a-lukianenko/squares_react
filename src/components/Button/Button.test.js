import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button component renders props correctly", () => {
  const clickMock = jest.fn();

  test("Add Button", () => {
    const props = {
      type: "+",
      style: { top: "calc(100% + 2px)", left: "3px" },
      size: 50,
      onClick: clickMock,
    };

    render(<Button {...props} />);
    const btn = screen.getByRole("button");

    expect(btn).toHaveTextContent(props.type);
    expect(btn).toHaveClass("addBtn");
    expect(btn).toHaveStyle(props.style);
    expect(btn).toBeVisible();

    userEvent.click(btn);
    expect(clickMock).toHaveBeenCalledTimes(1);
  });

  test("Remove Button", () => {
    const props = {
      type: "-",
      style: {
        top: "2px",
        right: "100%",
        boxShadow: "inset -3px 0px 0 -1px white",
      },
      size: 50,
      onClick: clickMock,
      isVisible: true,
    };

    render(<Button {...props} />);
    const btn = screen.getByRole("button");

    expect(btn).toHaveTextContent(props.type);
    expect(btn).toHaveStyle(props.style);
    expect(btn).toHaveClass("removeBtn visible");
    expect(btn).toBeVisible();

    userEvent.click(btn);
    expect(clickMock).toHaveBeenCalledTimes(1);
  });
});
