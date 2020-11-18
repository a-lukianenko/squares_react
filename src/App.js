import React from "react";
import Table from "./components/Table/Table";
import AddRowBtn from "./components/Buttons/AddButtons/AddRow";
import AddColumnBtn from "./components/Buttons/AddButtons/AddColumn";
import RemoveColumnBtn from "./components/Buttons/RemoveButtons/RemoveColumn";
import RemoveRowBtn from "./components/Buttons/RemoveButtons/RemoveRow";
import "./App.css";

function App() {
  const initialState = {
    rowsNum: 4,
    cellsNum: 4,
    rows: [...Array(4).keys()].map(el => ({ id: el })),
    cells: [...Array(4).keys()].map(el => ({ id: el })),
    rowKey: 0,
    cellKey: 0,
    initialWidth: 50,
    left: 0,
    top: 0,
    isRemoveColumnVisible: false,
    isRemoveRowVisible: false,
  };

  const [state, setState] = React.useState(initialState);

  function addRow() {
    setState(state => ({
      ...state,
      rowsNum: state.rowsNum + 1,
      rows: [...Array(state.rowsNum + 1).keys()].map(el => ({ id: el })),
    }));
  }

  function addColumn() {
    setState(state => ({
      ...state,
      cellsNum: state.cellsNum + 1,
      cells: [...Array(state.cellsNum + 1).keys()].map(el => ({ id: el })),
    }));
  }

  // Move RemoveColumn button
  function moveButtonX(offset, cellKey, flag) {
    setState(state => ({
      ...state,
      left: offset + 2 + "px",
      cellKey,
      isRemoveColumnVisible: flag,
    }));
  }

  // Move RemoveRow button
  function moveButtonY(offset, rowKey, flag) {
    setState(state => ({
      ...state,
      top: offset + 2 + "px",
      rowKey,
      isRemoveRowVisible: flag,
    }));
  }

  function removeRow() {
    const newRows = state.rows.filter(row => row.id !== state.rowKey);
    setState(state => ({
      ...state,
      rowsNum: state.rowsNum - 1,
      rows: newRows,
      isRemoveRowVisible: false,
      isRemoveColumnVisible: false,
    }));
  }

  function removeColumn() {
    const newCells = state.cells.filter(cell => cell.id !== state.cellKey);
    setState(state => ({
      ...state,
      cellsNum: state.cellsNum - 1,
      cells: newCells,
      isRemoveRowVisible: false,
      isRemoveColumnVisible: false,
    }));
  }

  // Mouse leaves the table
  function mouseLeave(flag) {
    setState(state => ({
      ...state,
      isRemoveRowVisible: state.rowsNum > 1 ? flag : false,
      isRemoveColumnVisible: state.cellsNum > 1 ? flag : false,
    }));
  }

  // Mouse leaves RemoveButtons
  function buttonLeave() {
    setState(state => ({
      ...state,
      isRemoveRowVisible: false,
      isRemoveColumnVisible: false,
    }));
  }

  return (
    <div className='squaresWrapper'>
      <Table
        rows={state.rows}
        cells={state.cells}
        rowsNum={state.rowsNum}
        cellsNum={state.cellsNum}
        initialWidth={state.initialWidth}
        moveButtonX={moveButtonX}
        moveButtonY={moveButtonY}
        mouseLeave={mouseLeave}
      />
      <AddRowBtn initialWidth={state.initialWidth} addRow={addRow} />
      <AddColumnBtn initialWidth={state.initialWidth} addColumn={addColumn} />
      <RemoveRowBtn
        initialWidth={state.initialWidth}
        offset={state.top}
        isVisible={state.isRemoveRowVisible}
        removeRow={removeRow}
        buttonLeave={buttonLeave}
      />
      <RemoveColumnBtn
        initialWidth={state.initialWidth}
        offset={state.left}
        isVisible={state.isRemoveColumnVisible}
        removeColumn={removeColumn}
        buttonLeave={buttonLeave}
      />
    </div>
  );
}

export default App;
