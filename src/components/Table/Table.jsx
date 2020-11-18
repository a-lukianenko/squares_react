import React from "react";
import style from "./Table.module.css";

// Table
const Table = ({
  rows,
  cells,
  rowsNum,
  cellsNum,
  initialWidth,
  moveButtonX,
  moveButtonY,
  mouseLeave,
}) => {
  function handleMouseLeave(event) {
    const { className } = event.relatedTarget;
    className && className.includes("RemoveButtons")
      ? mouseLeave(true)
      : mouseLeave(false);
  }

  const tableRows = rows.map(row => (
    <Row
      key={row.id}
      cells={cells}
      rowKey={row.id}
      rowsNum={rowsNum}
      cellsNum={cellsNum}
      initialWidth={initialWidth}
      moveButtonX={moveButtonX}
      moveButtonY={moveButtonY}
    />
  ));

  return (
    <table className={style.squares} onMouseLeave={handleMouseLeave}>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

// Row
const Row = ({
  cells,
  rowsNum,
  cellsNum,
  initialWidth,

  moveButtonX,
  moveButtonY,
  rowKey,
}) => {
  const rowCells = cells.map(cell => (
    <Cell
      key={cell.id}
      cellKey={cell.id}
      rowKey={rowKey}
      cellsNum={cellsNum}
      rowsNum={rowsNum}
      initialWidth={initialWidth}
      moveButtonX={moveButtonX}
      moveButtonY={moveButtonY}
    />
  ));

  return <tr>{rowCells}</tr>;
};

// Cell
const Cell = ({
  rowKey,
  cellKey,
  rowsNum,
  cellsNum,
  initialWidth,
  moveButtonX,
  moveButtonY,
}) => {
  function handleMove(event) {
    const { offsetLeft, offsetTop } = event.target;
    if (rowsNum > 1 && cellsNum > 1) {
      moveButtonY(offsetTop, rowKey, true);
      moveButtonX(offsetLeft, cellKey, true);
    } else if (rowsNum > 1) {
      moveButtonY(offsetTop, rowKey, true);
    } else if (cellsNum > 1) {
      moveButtonX(offsetLeft, cellKey, true);
    }
  }

  return (
    <td
      style={{ width: initialWidth + "px", height: initialWidth + "px" }}
      className={style.square}
      onMouseMove={handleMove}
    >
      {rowKey}
    </td>
  );
};

export default Table;
