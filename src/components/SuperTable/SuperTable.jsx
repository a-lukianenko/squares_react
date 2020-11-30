import React, { useState, useCallback, useMemo } from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";
import css from "./SuperTable.module.css";
import { Context } from "../../context";

const SuperTable = ({ initialWidth = 4, initialHeight = 4, cellSize = 50 }) => {
  // integer to an array of objects with id
  const range = useCallback(int => {
    return [...Array(int).keys()].map(el => ({ id: el }));
  }, []);

  const initialPosition = {
    rowIndex: 0,
    cellIndex: 0,
    left: null,
    top: null,
  };

  const [position, setPosition] = useState(initialPosition);
  const [rows, setRows] = useState(() => range(initialHeight));
  const [cells, setCells] = useState(() => range(initialWidth));
  const [isVisible, setIsVisible] = useState(false);

  // Add Buttons methods & styles
  const addRow = useCallback(() => setRows(range(rows.length + 1)), [
    range,
    rows.length,
  ]);

  const addRowStyle = useMemo(
    () => ({ top: "calc(100% + 2px)", left: "3px" }),
    []
  );

  const addColumn = useCallback(() => setCells(range(cells.length + 1)), [
    range,
    cells.length,
  ]);

  const addColumnStyle = useMemo(
    () => ({ top: "3px", left: "calc(100% + 2px)" }),
    []
  );
  //

  // Remove buttons methods & styles
  const removeRow = useCallback(() => {
    setIsVisible(false);
    setRows(rows.filter((_, i) => i !== position.rowIndex));
  }, [rows, position.rowIndex]);

  const removeRowStyle = useMemo(
    () => ({
      top: position.top + 2,
      right: "100%",
      boxShadow: "inset -3px 0px 0 -1px white",
    }),
    [position.top]
  );

  const removeColumn = useCallback(() => {
    setIsVisible(false);
    setCells(cells.filter((_, i) => i !== position.cellIndex));
  }, [cells, position.cellIndex]);

  const removeColumnStyle = useMemo(
    () => ({
      left: position.left + 2,
      bottom: "100%",
      boxShadow: "inset 0px -3px 0 -1px white",
    }),
    [position.left]
  );
  //

  // Display & move Buttons along their axes
  const moveButtons = useCallback(
    ({ offsetLeft, offsetTop, rowIndex, cellIndex }) => {
      setPosition({
        left: offsetLeft,
        top: offsetTop,
        rowIndex,
        cellIndex,
      });
      setIsVisible(true);
    },
    []
  );

  const hideButtons = useCallback(flag => {
    setIsVisible(flag);
  }, []);

  const mouseLeaveSuperTable = useCallback(() => {
    setIsVisible(false);
  }, []);
  //

  return (
    <div className={css.squaresWrapper} onMouseLeave={mouseLeaveSuperTable}>
      <Context.Provider value={{ cellSize, cells: cells }}>
        <Table
          rows={rows}
          // cellSize={cellSize}
          // cells={cells}
          onMouseOver={moveButtons}
          onMouseLeave={hideButtons}
        />

        {/* Add Row button */}
        <Button type='+' style={addRowStyle} size={cellSize} onClick={addRow} />

        {/* Add Column button */}
        <Button
          type='+'
          style={addColumnStyle}
          size={cellSize}
          onClick={addColumn}
        />

        {/* Remove Row button */}
        <Button
          type='-'
          style={removeRowStyle}
          size={cellSize}
          onClick={removeRow}
          isVisible={isVisible && rows.length > 1}
        />

        {/* Remove Column button */}
        <Button
          type='-'
          style={removeColumnStyle}
          size={cellSize}
          onClick={removeColumn}
          isVisible={isVisible && cells.length > 1}
        />
      </Context.Provider>
    </div>
  );
};

export default SuperTable;
