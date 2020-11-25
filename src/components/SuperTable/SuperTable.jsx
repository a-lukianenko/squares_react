import React, { useState } from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";
import css from "./SuperTable.module.css";
import { Context } from "../../context";

const SuperTable = ({ initialWidth = 4, initialHeight = 4, cellSize = 50 }) => {
  // integer to an array of objects with id
  const range = int => [...Array(int).keys()].map(el => ({ id: el }));

  const initialState = {
    rows: range(initialHeight),
    cells: range(initialWidth),
    rowIndex: null,
    cellIndex: null,
    left: null,
    top: null,
    isVisible: null,
  };

  const [state, setState] = useState(initialState);

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
    setState(state => ({
      ...state,
      rows: state.rows.filter((_, i) => i !== state.rowIndex),
      isVisible: false,
    }));
  }

  function removeColumn() {
    setState(state => ({
      ...state,
      cells: state.cells.filter((_, i) => i !== state.cellIndex),
      isVisible: false,
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
      isVisible: true,
    });
  }

  function hideButtons(flag) {
    setState(state => ({
      ...state,
      isVisible: flag,
    }));
  }

  function mouseLeaveSuperTable() {
    setState(state => ({
      ...state,
      isVisible: false,
    }));
  }

  return (
    <div className={css.squaresWrapper} onMouseLeave={mouseLeaveSuperTable}>
      <Context.Provider value={{ cellSize, cells: state.cells }}>
        <Table
          rows={state.rows}
          onMouseMove={moveButtons}
          onMouseLeave={hideButtons}
        />

        {/* Add Row button */}
        <Button
          type='+'
          style={{ top: "calc(100% + 2px)", left: "3px" }}
          size={cellSize}
          onClick={addRow}
        />

        {/* Add Column button */}
        <Button
          type='+'
          style={{ top: "3px", left: "calc(100% + 2px)" }}
          size={cellSize}
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
          size={cellSize}
          onClick={removeRow}
          isVisible={state.isVisible && state.rows.length > 1}
        />

        {/* Remove Column button */}
        <Button
          type='-'
          style={{
            left: state.left + 2,
            bottom: "100%",
            boxShadow: "inset 0px -3px 0 -1px white",
          }}
          size={cellSize}
          onClick={removeColumn}
          isVisible={state.isVisible && state.cells.length > 1}
        />
      </Context.Provider>
    </div>
  );
};

export default SuperTable;
