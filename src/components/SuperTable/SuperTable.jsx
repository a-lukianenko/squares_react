import React, { useState, useCallback } from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";
import css from "./SuperTable.module.css";
import { Context } from "../../context";

const functionsCounter = new Set();

const SuperTable = ({ initialWidth = 4, initialHeight = 4, cellSize = 50 }) => {
  // integer to an array of objects with id
  const range = useCallback(int => {
    return [...Array(int).keys()].map(el => ({ id: el }));
  }, []);

  const initialState = {
    rowIndex: null,
    cellIndex: null,
    left: null,
    top: null,
  };

  const [state, setState] = useState(initialState);
  const [rows, setRows] = useState(() => range(initialHeight));
  const [cells, setCells] = useState(() => range(initialWidth));
  const [isVisible, setIsVisible] = useState(false);

  // Add Buttons methods
  function addRow() {
    setRows(range(rows.length + 1));
  }

  function addColumn() {
    setCells(range(cells.length + 1));
  }
  //

  // Remove buttons methods
  function removeRow() {
    setIsVisible(false);
    setRows(rows.filter((_, i) => i !== state.rowIndex));
  }

  function removeColumn() {
    setIsVisible(false);
    setCells(cells.filter((_, i) => i !== state.cellIndex));
  }
  //

  // Display & move Buttons along their axes
  function showButtons() {
    setIsVisible(true);
  }

  function moveButtons({ offsetLeft, offsetTop, rowIndex, cellIndex }) {
    setState({
      left: offsetLeft,
      top: offsetTop,
      rowIndex,
      cellIndex,
    });
  }

  function hideButtons(flag) {
    setIsVisible(flag);
  }

  function mouseLeaveSuperTable() {
    setIsVisible(false);
  }
  //

  functionsCounter.add(range);
  console.log(functionsCounter);

  return (
    <div className={css.squaresWrapper} onMouseLeave={mouseLeaveSuperTable}>
      <Context.Provider value={{ cellSize, cells: cells }}>
        <Table
          rows={rows}
          left={state.left}
          top={state.top}
          onMouseEnter={showButtons}
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
          isVisible={isVisible && rows.length > 1}
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
          isVisible={isVisible && cells.length > 1}
        />
      </Context.Provider>
    </div>
  );
};

export default SuperTable;
