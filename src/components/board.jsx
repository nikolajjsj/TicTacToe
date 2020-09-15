import React, { useState } from "react";

export default function Board() {
  const [winner, setWinner] = useState("");
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
      checkForWinner();
    }
  }

  function resetBoard() {
    const resetArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    setBoard(resetArray);
    setWinner("");
    setTurn(true);
  }

  function checkForWinner() {
    function checkTrio(a, b, c) {
      if (a === b && b === c && a !== "") setWinner(a);
    }
    /// check for winners in row
    checkTrio(board[0][0], board[0][1], board[0][2]);
    checkTrio(board[1][0], board[1][1], board[1][2]);
    checkTrio(board[2][0], board[2][1], board[2][2]);
    /// check for winners in columns
    checkTrio(board[0][0], board[1][0], board[2][0]);
    checkTrio(board[0][1], board[1][1], board[2][1]);
    checkTrio(board[0][2], board[1][2], board[2][2]);
    /// check for winners in diagonals
    checkTrio(board[0][0], board[1][1], board[2][2]);
    checkTrio(board[2][0], board[1][1], board[0][2]);
  }

  return (
    <>
      <h2 hidden={winner !== ""}>Turn: {isX ? "X" : "O"}</h2>
      <h2 hidden={winner === ""}>Winner: {winner}</h2>
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
