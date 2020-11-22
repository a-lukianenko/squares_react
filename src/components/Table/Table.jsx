import React from "react";
import css from "./Table.module.css";

// Table
const Table = ({ rows, cells, cellSize, onMouseMove, onMouseLeave }) => {
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
      onMouseMove(payload);
    }
  }

  function handleMouseLeave(event) {
    const { className } = event.relatedTarget;
    className && className.includes("remove")
      ? onMouseLeave(true)
      : onMouseLeave(false);
  }

  return (
    <table
      className={css.squares}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <tbody>
        {rows.map(row => (
          <Row key={row.id} cells={cells} cellSize={cellSize} />
        ))}
      </tbody>
    </table>
  );
};

// Row
const Row = ({ cells, cellSize }) => {
  return (
    <tr>
      {cells.map(cell => (
        <Cell key={cell.id} size={cellSize} />
      ))}
    </tr>
  );
};

// Cell
const Cell = ({ size }) => {
  return (
    <td
      style={{ width: size + "px", height: size + "px" }}
      className={css.square}
    ></td>
  );
};

export default Table;
