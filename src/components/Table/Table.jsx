import React from "react";
import css from "./Table.module.css";

// Table
const Table = ({ rows, cells, cellSize, moveButtons, mouseLeave }) => {
  function handleMouseMove(event) {
    if (event.target.tagName === "TD") {
      const {
        offsetTop,
        offsetLeft,
        cellIndex,
        parentElement: { rowIndex },
      } = event.target;
      const payload = {
        offsetLeft,
        offsetTop,
        rowIndex,
        cellIndex,
      };
      moveButtons(payload);
    }
  }

  function handleMouseLeave(event) {
    const { className } = event.relatedTarget;
    className && className.includes("remove")
      ? mouseLeave(true)
      : mouseLeave(false);
  }

  const tableRows = rows.map(row => (
    <Row
      rowsNum={row.length}
      cellsNum={cells.length}
      key={row.id}
      cells={cells}
      cellSize={cellSize}
    />
  ));

  return (
    <table
      className={css.squares}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <tbody>{tableRows}</tbody>
    </table>
  );
};

// Row
const Row = ({ cells, cellSize, rowsNum, cellsNum }) => {
  const rowCells = cells.map(cell => (
    <Cell
      rowsNum={rowsNum}
      cellsNum={cellsNum}
      key={cell.id}
      cellSize={cellSize}
    />
  ));

  return <tr>{rowCells}</tr>;
};

// Cell
const Cell = ({ rowsNum, cellsNum, cellSize }) => {
  return (
    <td
      style={{ width: cellSize + "px", height: cellSize + "px" }}
      className={css.square}
    ></td>
  );
};

export default Table;
