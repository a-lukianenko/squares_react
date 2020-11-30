import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";
import SuperTable from "../SuperTable/SuperTable";

describe("Add Button", () => {
  const initialHeight = 4;
  const initialWidth = 4;
  beforeEach(() => {
    render(
      <SuperTable
        initialHeight={initialHeight}
        initialWidth={initialWidth}
        cellSize={50}
      />
    );
  });
  test("adds 1 row when clicked", () => {
    expect(screen.getAllByRole("row").length).toBe(initialHeight);
    userEvent.click(screen.getAllByRole("button", { name: "+" })[0]);

    expect(screen.getAllByRole("row").length).toBe(initialHeight + 1);
    expect(screen.getAllByRole("row")[0].cells.length).not.toBe(
      initialWidth + 1
    );
  });

  test("adds 1 column when clicked", () => {
    expect(screen.getAllByRole("cell").length).toBe(
      initialHeight * initialWidth
    );
    userEvent.click(screen.getAllByRole("button", { name: "+" })[1]);

    expect(screen.getAllByRole("cell").length).toBe(4 * (initialWidth + 1));
  });
});

describe("Remove button", () => {
  test("Remove btn gets clicked", () => {
    const clickMock = jest.fn();
    render(<Button type='-' onClick={clickMock} />);

    const btn = screen.getByRole("button");
    userEvent.click(btn);
    expect(clickMock).toHaveBeenCalledTimes(1);
  });
});
