import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuperTable from "./SuperTable";

describe("Table re-renders", () => {
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

  test("with +1 row when Add Row Button is clicked", () => {
    userEvent.click(screen.getAllByRole("button", { name: "+" })[0]);
    expect(screen.getAllByRole("row").length).toBe(initialHeight + 1);
  });

  test("with +1 column when Add Column Button is clicked", () => {
    userEvent.click(screen.getAllByRole("button", { name: "+" })[1]);
    expect(screen.getAllByRole("cell").length).toBe(
      initialHeight * (initialWidth + 1)
    );
  });

  test("with -1 row when Remove Row Button is clicked", () => {
    const removeRowBtn = screen.getAllByRole("button", { name: "-" })[0];

    userEvent.click(removeRowBtn);
    expect(screen.getAllByRole("row").length).toBe(initialHeight - 1);
  });

  test("with -1 column when Remove Column Button is clicked", () => {
    const cells = screen.getAllByRole("cell");
    const removeColBtn = screen.getAllByRole("button", { name: "-" })[1];

    expect(cells.length).toBe(initialWidth * initialHeight);

    userEvent.click(removeColBtn);
    expect(screen.getAllByRole("cell").length).toBe(
      cells.length - initialWidth
    );
  });

  test("with minomum of 1 row", () => {
    const removeRowBtn = screen.getAllByRole("button", { name: "-" })[0];
    for (let i = 0; i < initialHeight; i++) {
      userEvent.click(removeRowBtn);
    }
    expect(screen.getAllByRole("row").length).toBe(1);
  });

  test("with minimum of 1 column", () => {
    const removeColBtn = screen.getAllByRole("button", { name: "-" })[1];
    for (let i = 0; i < initialWidth; i++) {
      userEvent.click(removeColBtn);
    }
    expect(screen.getAllByRole("cell").length).toBe(initialWidth);
  });
});
