import styled from 'styled-components';

const Wrapper = styled.div`
  .gameContainer {
    border-color: var(--primary-color);
    border-width: 1rem;
    border-style: solid;
  }

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  .modal {
    position: absolute;
    background: rgb(1, 1, 1, 0.9);
    z-index: 2;
    top: 7.8rem;
    height: ${(props) => props.height * props.cellSize}px;
    width: ${(props) => props.width * props.cellSize}px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 2rem;
  }

  .gameHeader {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    background-color: var(--primary-color);
  }

  .flagsCounter,
  .timer {
    background-color: #000;
    color: var(--alarm-color);
    padding: 0.4rem;
    font-family: 'DIGITALDREAM', sans-serif;
    font-size: 2.2rem;
    min-width: 7rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .emoji {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    background-color: var(--primary-color);
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }

  .difficultyHeader {
    text-align: center;
    font-size: 2.6rem;
    background-color: var(--primary-color);
  }
  .difficultyButtons {
    display: flex;
    flex-direction: row;
  }
  .difficultyButton {
    width: 100%;
    height: 3rem;
  }

  .cells {
    height: ${(props) => props.height * props.cellSize}px;
    width: ${(props) => props.width * props.cellSize}px;
    display: grid;
    grid-template-columns: repeat(${(props) => props.width}, ${(props) => props.cellSize}px);
  }

  .hidden {
    display: none;
  }
`;

export default Wrapper;
