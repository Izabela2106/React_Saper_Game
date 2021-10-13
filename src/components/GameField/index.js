import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import Cell from '../Cell';
import Wrapper from './GameFieldWrapper';

const GameField = ({ width, height, cellSize }) => {
  const { fieldArray, flagsToPlace, difficultyButton, gameActive, isModalActive } =
    useGlobalContext();

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (!isModalActive) {
      setSeconds(0);
    }
    return null;
  }, [gameActive, isModalActive]);

  return (
    <Wrapper width={width} height={height} cellSize={cellSize}>
      <div className="gameContainer">
        {isModalActive && (
          <div className="modal">
            <p>You won !</p>
            <p>{`It took you ${seconds} seconds.`}</p>
          </div>
        )}

        <div className="gameHeader">
          <div className="flagsCounter">{flagsToPlace}</div>
          <div className="emoji" />
          <div className="timer">{seconds}</div>
        </div>

        <div className="cells">
          {fieldArray.map((cell, index) => (
            <Cell
              value={cell.value}
              size={cellSize}
              key={index}
              row={cell.row}
              column={cell.column}
              bomb={cell.bomb}
              state={cell.state}
              flag={cell.flag}
            />
          ))}
        </div>
        <div className="difficultyPanel">
          <div className="difficultyHeader">Select Difficulty</div>
          <div className="difficultyButtons">
            <button className="difficultyButton" name="easy" onClick={difficultyButton}>
              EASY
            </button>
            <button className="difficultyButton" name="normal" onClick={difficultyButton}>
              NORMAL
            </button>
            <button className="difficultyButton" name="hard" onClick={difficultyButton}>
              HARD
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default GameField;
