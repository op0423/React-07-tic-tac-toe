import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/LOg";
import GameOver from "./components/GameOver";
const PLAYERS = {
  X: "player1",
  O: "player2",
};
const INITAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
// 判斷現在是誰的回合
function deriveActivePlayer(preTurns) {
  let currentPlayer = "X";
  if (preTurns.length > 0 && preTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
//  判斷勝負
function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
// 判斷該格子是O還是X
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleStart() {
    setGameTurns([]);
  }
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((player) => (player === "X" ? "O" : "X"));
    setGameTurns((preTurns) => {
      const currentPlayer = deriveActivePlayer(preTurns);
      // let currentPlayer = "X";
      // if (preTurns.length > 0 && preTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preTurns,
      ];
      return updateTurns;
    });
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prePlayers) => {
      return {
        ...prePlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleStart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
