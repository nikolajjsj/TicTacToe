import React, { useState } from "react";

export default function Board() {
  const [winner, setWinner] = useState("");
  const [isX, setTurn] = useState(true);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  function currentPlayer() {
    return isX ? "X" : "O";
  }

  function nextMove(row, column) {
    let tmpBoard = [...board];
    if (tmpBoard[row][column] === "") {
      tmpBoard[row][column] = currentPlayer();
      setTurn(!isX);
      setBoard(tmpBoard);
      let result = checkWinner(board);
      if (result != null) {
        setWinner(result);
      }
    }
  }

  function aiMove() {
    // best score with minimax algorhitm
    let bestScore = -Infinity;
    let move;
    // temp board
    let tmpBoard = [...board];
    // loop over slots in the board
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // is spot available
        if (tmpBoard[i][j] === "") {
          tmpBoard[i][j] = currentPlayer();
          let score = minimax(tmpBoard, 0, false);
          tmpBoard[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
					}
					console.log(score);
        }
      }
		}
    if (move != null) {
      console.log("AI turn");
      tmpBoard[move.i][move.j] = currentPlayer();
      setTurn(!isX);
      setBoard(tmpBoard);
      let result = checkWinner(board);
      if (result != null) {
        setWinner(result);
      }
    }
  }

  const scores = { X: 10, O: -10, tie: 0 };

  function minimax(board, depth, isMaximizing) {
    let result = checkWinner(board);
    if (result != null) return scores[result];

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // is spot available
          if (board[i][j] === "") {
            board[i][j] = currentPlayer();
            let score = minimax(board, depth + 1, false);
						board[i][j] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // is spot available
          if (board[i][j] === "") {
            board[i][j] = isX ? 'O' : 'X';
            let score = minimax(board, depth + 1, true);
            board[i][j] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
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

  function checkWinner(arr) {
    let winner = null;
    function checkTrio(a, b, c) {
      if (a === b && b === c && a !== "") winner = a;
    }
    /// check for winners in row
    checkTrio(arr[0][0], arr[0][1], arr[0][2]);
    checkTrio(arr[1][0], arr[1][1], arr[1][2]);
    checkTrio(arr[2][0], arr[2][1], arr[2][2]);
    /// check for winners in columns
    checkTrio(arr[0][0], arr[1][0], arr[2][0]);
    checkTrio(arr[0][1], arr[1][1], arr[2][1]);
    checkTrio(arr[0][2], arr[1][2], arr[2][2]);
    /// check for winners in diagonals
    checkTrio(arr[0][0], arr[1][1], arr[2][2]);
    checkTrio(arr[2][0], arr[1][1], arr[0][2]);
    return winner;
  }

  return (
    <>
      <h2 hidden={winner !== ""}>Turn: {currentPlayer()}</h2>
      <h2 hidden={winner === ""}>Winner: {winner}</h2>
      <div className="button-row">
        <button onClick={() => aiMove()}>AI Turn</button>
        <button onClick={() => resetBoard()}>Reset</button>
      </div>
      <br />
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((tile, columnIndex) => (
            <BoardTile
              key={`${rowIndex}${columnIndex}`}
              tile={tile}
              tileClick={() => nextMove(rowIndex, columnIndex)}
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
