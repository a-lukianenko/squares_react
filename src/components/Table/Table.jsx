import React from "react";
import style from "./Table.module.css";

// Table
const Table = ({ rows, cells, moveButtonX, moveButtonY }) => {
  const tableRows = rows.map(row => (
    <Row
      key={row.id}
      cells={cells}
      rowKey={row.id}
      moveButtonX={moveButtonX}
      moveButtonY={moveButtonY}
    />
  ));

  return (
    <table className={style.squares}>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

// Row
const Row = ({ cells, moveButtonX, moveButtonY, rowKey }) => {
  const rowCells = cells.map(cell => (
    <Cell
      key={cell.id}
      cellKey={cell.id}
      rowKey={rowKey}
      moveButtonX={moveButtonX}
      moveButtonY={moveButtonY}
    />
  ));

  return <tr>{rowCells}</tr>;
};

// Cell
const Cell = ({ moveButtonX, moveButtonY, rowKey, cellKey }) => {
  function handleMove(event) {
    const { offsetLeft, offsetTop } = event.target;
    moveButtonX(offsetLeft, cellKey);
    moveButtonY(offsetTop, rowKey);
  }

  return (
    <td className={style.square} onMouseMove={handleMove}>
      {rowKey}
    </td>
  );
};

export default Table;
