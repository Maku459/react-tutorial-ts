import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import Board from "./Board";
import './index.css';

type oneSquareType = "X" | "O" | null;
type gameState = {
    squares: Array<oneSquareType>
    location: {
        col: number | null;
        row: number | null;
    }
}

const Game = () =>  {
    const [history, setHistory] = useState<gameState[]>([
        {
            squares: Array(9).fill(null),
            location: {
                col: null,
                row: null
            }
        }
    ]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const handleClick = (i: number) => {
        const historyCurrent = history.slice(0, stepNumber + 1);
        const current = historyCurrent[historyCurrent.length - 1];
        const squares = [...current.squares];
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory([...historyCurrent, { squares, location: {col: i % 3, row: Math.trunc(i / 3)} }]);
        setStepNumber(historyCurrent.length);
        setXIsNext(!xIsNext);
    }
    const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => { 
        const desc = move ?
            'Go to move #' + move + '(' + step.location.col + ',' + step.location.row + ')' :
            'Go to game start';
        return (
            <li key={move}>
            <button 
                onClick={() => jumpTo(move)}
                className={move === stepNumber ? 'text-bold' : ''}
            >
                {desc}
            </button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
    <div className="game">
        <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => handleClick(i)}
            />
        </div>
        <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
        </div>
    </div>
    );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game />);

const calculateWinner = (squares: Array<oneSquareType>) => {
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
}