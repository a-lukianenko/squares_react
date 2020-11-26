import React, { useContext } from "react";
import css from "./Table.module.css";
import { Context } from "../../context";

// Table
const Table = ({ rows, onMouseEnter, onMouseOver, onMouseLeave }) => {
  function handleMouseOver({ target }) {
    if (target.tagName !== "TD") return;

    const {
      offsetTop,
      offsetLeft,
      parentElement: { rowIndex },
      cellIndex,
    } = target;

    const payload = {
      offsetLeft,
      offsetTop,
      rowIndex,
      cellIndex,
    };

    onMouseOver(payload);
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
      onMouseEnter={onMouseEnter}
      onMouseOver={handleMouseOver}
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
