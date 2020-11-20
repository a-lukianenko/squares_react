import React from "react";
import Table from "../Table/Table";
import Button from "../Buttons/Button";
import classes from "./SuperTable.module.css";

const SuperTable = ({ initialWidth, initialHeight, cellSize }) => {
  // integer to an array of objects with id
  const range = int => [...Array(int).keys()].map(el => ({ id: el }));

  const initialState = {
    rows: range(initialHeight),
    cells: range(initialWidth),
    rowIndex: 0,
    cellIndex: 0,
    left: 0,
    top: 0,
    isRemoveRowVisible: false,
    isRemoveColumnVisible: false,
  };

  const [state, setState] = React.useState(initialState);

  // Add Buttons methods
  function addRow() {
    setState(state => ({
      ...state,
      rows: range(state.rows.length + 1),
    }));
  }

  function addColumn() {
    setState(state => ({
      ...state,
      cells: range(state.cells.length + 1),
    }));
  }
  //

  // Remove buttons methods
  function removeRow() {
    if (state.rows.length > 1)
      setState(state => ({
        ...state,
        rows: state.rows.filter((_, i) => i !== state.rowIndex),
        isRemoveRowVisible: false,
        isRemoveColumnVisible: false,
      }));
  }

  function removeColumn() {
    if (state.cells.length > 1)
      setState(state => ({
        ...state,
        cells: state.cells.filter((_, i) => i !== state.cellIndex),
        isRemoveRowVisible: false,
        isRemoveColumnVisible: false,
      }));
  }
  //

  // Move Buttons along their axes
  function moveButtons({ offsetLeft, offsetTop, rowIndex, cellIndex }) {
    setState({
      ...state,
      left: offsetLeft,
      top: offsetTop,
      rowIndex,
      cellIndex,
      isRemoveRowVisible: state.rows.length > 1 ? true : false,
      isRemoveColumnVisible: state.cells.length > 1 ? true : false,
    });
  }

  function mouseLeaveTable(flag) {
    setState(state => ({
      ...state,
      isRemoveRowVisible: state.rows.length > 1 ? flag : false,
      isRemoveColumnVisible: state.cells.length > 1 ? flag : false,
    }));
  }

  function mouseLeaveSuperTable() {
    setState(state => ({
      ...state,
      isRemoveRowVisible: false,
      isRemoveColumnVisible: false,
    }));
  }

  return (
    <div className={classes.squaresWrapper} onMouseLeave={mouseLeaveSuperTable}>
      <Table
        rows={state.rows}
        cells={state.cells}
        cellSize={cellSize}
        moveButtons={moveButtons}
        mouseLeave={mouseLeaveTable}
      />

      {/* Add Row */}
      <Button
        className='addRow'
        type='+'
        cellSize={cellSize}
        handleClick={addRow}
      />

      {/* Add Column */}
      <Button
        className='addColumn'
        type='+'
        cellSize={cellSize}
        handleClick={addColumn}
      />

      {/* Remove Row */}
      <Button
        className='removeRow'
        type='-'
        cellSize={cellSize}
        top={state.top + 2}
        handleClick={removeRow}
        isVisible={state.isRemoveRowVisible}
      />

      {/* Remove Column */}
      <Button
        className='removeColumn'
        type='-'
        cellSize={cellSize}
        left={state.left + 2}
        handleClick={removeColumn}
        isVisible={state.isRemoveColumnVisible}
      />
    </div>
  );
};

export default SuperTable;
