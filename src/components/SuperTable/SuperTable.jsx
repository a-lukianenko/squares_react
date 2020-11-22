import React from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";
import css from "./SuperTable.module.css";

const SuperTable = ({ initialWidth = 4, initialHeight = 4, cellSize = 50 }) => {
  // integer to an array of objects with id
  const range = int => [...Array(int).keys()].map(el => ({ id: el }));

  const initialState = {
    rows: range(initialHeight),
    cells: range(initialWidth),
    rowIndex: 0,
    cellIndex: 0,
    left: null,
    top: null,
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
    if (state.rows[1])
      setState(state => ({
        ...state,
        rows: state.rows.filter((_, i) => i !== state.rowIndex),
        isRemoveRowVisible: false,
        isRemoveColumnVisible: false,
      }));
  }

  function removeColumn() {
    if (state.cells[1])
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
      isRemoveRowVisible: state.rows[1] ? true : false,
      isRemoveColumnVisible: state.cells[1] ? true : false,
    });
  }

  function showButtons(flag) {
    setState(state => ({
      ...state,
      isRemoveRowVisible: state.rows[1] ? flag : false,
      isRemoveColumnVisible: state.cells[1] ? flag : false,
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
    <div className={css.squaresWrapper} onMouseLeave={mouseLeaveSuperTable}>
      <Table
        rows={state.rows}
        cells={state.cells}
        cellSize={cellSize}
        onMouseMove={moveButtons}
        onMouseLeave={showButtons}
      />

      {/* Add Row button */}
      <Button
        type='+'
        style={{ top: "calc(100% + 2px)", left: "3px" }}
        cellSize={cellSize}
        onClick={addRow}
      />

      {/* Add Column button */}
      <Button
        type='+'
        style={{ top: "3px", left: "calc(100% + 2px)" }}
        cellSize={cellSize}
        onClick={addColumn}
      />

      {/* Remove Row button */}
      <Button
        type='-'
        style={{
          top: state.top + 2,
          right: "100%",
          boxShadow: "inset -3px 0px 0 -1px white",
        }}
        cellSize={cellSize}
        onClick={removeRow}
        isVisible={state.isRemoveRowVisible}
      />

      {/* Remove Column button */}
      <Button
        type='-'
        style={{
          left: state.left + 2,
          bottom: "100%",
          boxShadow: "inset 0px -3px 0 -1px white",
        }}
        cellSize={cellSize}
        onClick={removeColumn}
        isVisible={state.isRemoveColumnVisible}
      />
    </div>
  );
};

export default SuperTable;
