import React, { useState } from "react";

export default function Board() {
  const [isX, setTurn] = useState(true);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function updateBoard(row, column) {
    let tmpBoard = [...board];
    if (tmpBoard[row][column] === "") {
      tmpBoard[row][column] = isX ? "X" : "O";
      setTurn(!isX);
      setBoard(tmpBoard);
    }
  }

  function resetBoard() {
    const resetArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    setBoard(resetArray);
    setTurn(true);
  }

  return (
    <>
      <h2>Turn: {isX ? "X" : "O"}</h2>
      <div className="button-row">
        <button onClick={() => resetBoard()}>AI Turn</button>
        <button onClick={() => resetBoard()}>Reset</button>
      </div>
      <br />
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((tile, columnIndex) => (
            <BoardTile
              key={`${rowIndex}${columnIndex}`}
              tile={tile}
              tileClick={() => updateBoard(rowIndex, columnIndex)}
            />
          ))
        )}
      </div>
    </>
  );
}

function BoardTile({ tile, tileClick }) {
  return (
    <div className="board-tile" onClick={tileClick}>
      {tile}
    </div>
  );
}
