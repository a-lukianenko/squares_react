import React, { useContext } from "react";
import css from "./Table.module.css";
import { Context } from "../../context";

// Table
const Table = ({ rows, onMouseMove, onMouseLeave }) => {
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

  function handleMouseLeave({ relatedTarget }) {
    const { className } = relatedTarget;
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
          <Row key={row.id} />
        ))}
      </tbody>
    </table>
  );
};

// Row
const Row = () => {
  const { cells } = useContext(Context);
  return (
    <tr>
      {cells.map(cell => (
        <Cell key={cell.id} />
      ))}
    </tr>
  );
};

// Cell
const Cell = () => {
  const { cellSize } = useContext(Context);
  return (
    <td
      style={{ width: cellSize + "px", height: cellSize + "px" }}
      className={css.square}
    ></td>
  );
};

export default Table;
