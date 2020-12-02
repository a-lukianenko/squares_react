import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";
import { Context } from "../../context";

test("Table component renders an InitialWidth x InitialHeight table", () => {
  const initialHeight = 4;
  const initialWidth = 4;

  const range = int => [...Array(int).keys()].map(el => ({ id: el }));

  const rows = range(initialHeight);
  const cells = range(initialWidth);

  render(
    <Context.Provider value={{ cellSize: 50, cells: cells }}>
      <Table rows={rows} />
    </Context.Provider>
  );

  const $rows = screen.getAllByRole("row");
  expect($rows.length).toEqual(initialHeight);

  const $cells = screen.getAllByRole("cell");
  expect($cells.length).toEqual(initialWidth * initialHeight);
});
