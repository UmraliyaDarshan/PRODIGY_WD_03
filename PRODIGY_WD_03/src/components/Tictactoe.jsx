import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../assets/Game.css';

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [next, setNext] = useState(true);
  const [initialMessage, setInitialMessage] = useState('Welcome to Tic-Tac-Toe! Player X starts.');
  const [gameMode, setGameMode] = useState(null);

  const handleClick = (index) => {
    if (initialMessage) {
      setInitialMessage(null);
    }

    const newBoard = [...board];
    if (newBoard[index] || calculateGameWinner(board) || isDraw(newBoard)) return;
    newBoard[index] = next ? 'X' : 'O';
    setBoard(newBoard);
    setNext(!next);
  };

  const makeAIMove = () => {
    const emptyIndices = board?.map(
      (value, index) => value === null ? index : null)
      ?.filter((value) => value !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices?.length)]
    handleClick(randomIndex);
  }

  const isDraw = (board) => {
    return board.every(square => square !== null) && !calculateGameWinner(board);
  };

  const calculateGameWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const gameWinner = calculateGameWinner(board);
  const draw = isDraw(board);
  const status = gameWinner ? `Winner: ${gameWinner}` : draw ? 'Game is a draw' : `Next player: ${next ? 'X' : 'O'}`;

  useEffect(() => {
    if (gameMode === "AI" && !next && !calculateGameWinner(board) && !isDraw(board)) {
      const timeout = setTimeout(() => makeAIMove(), 500);
      return () => clearTimeout(timeout);
    }
  }, [next, gameMode]);

  return (
    <>
      {gameWinner && <Confetti />}
      {draw && (
        <Confetti
          numberOfPieces={200}
          recycle={false}
          colors={['#999999', '#666666', '#333333']}
          gravity={0.2}
        />
      )}
      <div className="game">
        {!gameMode && (
          <div className="choice">
            <div className='mb-3 fs-5 fw-bold mt-0'>Welcome to Tic-Tac-Toe Game!</div >
            <button className='btn btn-primary me-4' onClick={() => setGameMode('AI')}>Play against AI</button>
            <button className='btn btn-success' onClick={() => setGameMode('2P')}>Play with another player</button>
          </div>
        )}
        {gameMode && (
          <>
            <div className="status">{initialMessage ? initialMessage : status}</div>
            <div className="board">
              {board.map((value, index) => (
                <div key={index} className="square" onClick={() => handleClick(index)}>
                  {value}
                </div>
              ))}
            </div>
            <button className='btn btn-outline-danger mt-4' onClick={() => window.location.reload()}>Exit the Game</button>
          </>
        )}
      </div></>
  );
};

export default Tictactoe;
