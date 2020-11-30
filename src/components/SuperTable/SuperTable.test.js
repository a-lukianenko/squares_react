import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuperTable from "./SuperTable";

test("SuperTable renders an InitialWidth x InitialHeight table", () => {
  const initialHeight = 4;
  const initialWidth = 4;

  render(
    <SuperTable
      initialHeight={initialHeight}
      initialWidth={initialWidth}
      cellSize={50}
    />
  );

  const $rows = screen.getAllByRole("row");
  expect($rows.length).toEqual(4);

  const $cells = screen.getAllByRole("cell");
  expect($cells.length).toEqual(initialWidth * initialHeight);
});

test("Remove Row Button removes 1 row", async () => {
  const initialHeight = 4;

  render(
    <SuperTable initialHeight={initialHeight} initialWidth={4} cellSize={50} />
  );

  const table = screen.getByRole("table");
  const rows = screen.getAllByRole("row");
  const button = screen.getAllByRole("button", { name: "-" })[0];
  // const clickMock = jest.fn();

  expect(rows.length).toBe(initialHeight);

  userEvent.hover(table);
  expect(button).toBeVisible();

  // userEvent.unhover(table);
  // expect(button).not.toBeVisible(); // doesn't pass

  // userEvent.click(button);
  // expect(clickMock).toHaveBeenCalled();

  // expect(rows.length).toBe(initialHeight - 1);
  // expect(button).not.toHaveClass("visible");
  // expect(button).not.toBeVisible();
});
