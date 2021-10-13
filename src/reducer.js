import { actions } from './ContextActions';
import { easy, normal, hard } from './Levels';

const reducer = (state, action) => {
  const placeNumbers = () => {
    const array = [...state.fieldArray];
    array.map((cell) => {
      const cellsToCount = [
        { r: cell.row - 1, c: cell.column - 1 },
        { r: cell.row - 1, c: cell.column },
        { r: cell.row - 1, c: cell.column + 1 },
        { r: cell.row, c: cell.column - 1 },
        { r: cell.row, c: cell.column + 1 },
        { r: cell.row + 1, c: cell.column - 1 },
        { r: cell.row + 1, c: cell.column },
        { r: cell.row + 1, c: cell.column + 1 },
      ];

      let value = 0;
      cellsToCount.forEach((item) => {
        if (item.r >= 0 && item.c >= 0 && item.r < state.width && item.c < state.height) {
          const cell2 = array.filter((ele) => ele.row === item.r && ele.column === item.c)[0];
          if (cell2.bomb) {
            value++;
          }
        }
      });
      cell.value = value;
      return cell;
    });
    return array;
  };

  const { HANDLE_DIFFICULTY_BUTTON, HANDLE_CLICK, PLACE_MINES, PLACE_NUMBERS, GENERATE_CELLS } =
    actions;
  const revealCell = (row, col, cellsArray, isGameActive, fieldCellsToReveal) => {
    let newArray = [...cellsArray];
    row = parseInt(row, 10);
    col = parseInt(col, 10);
    if (fieldCellsToReveal === state.startCellsToReveal) {
      isGameActive = true;
      const minesFreeCells = [
        { r: row - 1, c: col - 1 },
        { r: row - 1, c: col },
        { r: row - 1, c: col + 1 },
        { r: row, c: col - 1 },
        { r: row, c: col + 1 },
        { r: row + 1, c: col - 1 },
        { r: row + 1, c: col },
        { r: row + 1, c: col + 1 },
        { r: row, c: col },
      ];

      const freeCells = [];
      newArray.forEach((cell) => {
        minesFreeCells.forEach((freecell) => {
          if (freecell.r === cell.row && freecell.c === cell.column) {
            freeCells.push(cell);
          }
        });
      });

      newArray.map((cell) => {
        freeCells.forEach((freecell) => {
          if (freecell === cell) {
            if (freecell.bomb) {
              cell.bomb = false;
              let placed = false;
              while (!placed) {
                const randomNumber = Math.floor(Math.random() * state.height * state.width);
                if (
                  !cellsArray[randomNumber].bomb &&
                  !freeCells.includes(cellsArray[randomNumber])
                ) {
                  cellsArray[randomNumber].bomb = true;
                  placed = true;
                }
              }
            }
          }
        });
        return cellsArray;
      });
      placeNumbers();
    }

    let value = null;
    newArray = cellsArray.map((cell) => {
      if (
        row === cell.row &&
        col === cell.column &&
        !cell.flag &&
        isGameActive &&
        cell.state === 1
      ) {
        if (cell.bomb) {
          isGameActive = false;
        }
        value = cell.value;
        fieldCellsToReveal--;
        return { ...cell, state: 2 };
      }
      return cell;
    });

    if (value === 0) {
      row = parseInt(row, 10);
      col = parseInt(col, 10);
      const cellsToReveal = [
        { r: row - 1, c: col - 1 },
        { r: row - 1, c: col },
        { r: row - 1, c: col + 1 },
        { r: row, c: col - 1 },
        { r: row, c: col + 1 },
        { r: row + 1, c: col - 1 },
        { r: row + 1, c: col },
        { r: row + 1, c: col + 1 },
      ];
      cellsToReveal.forEach((item) => {
        if (item.r >= 0 && item.c >= 0 && item.r < state.width && item.c < state.height) {
          const returnObject = revealCell(
            item.r,
            item.c,
            newArray,
            isGameActive,
            fieldCellsToReveal,
          );
          newArray = returnObject.newArray;
          isGameActive = returnObject.isGameActive;
          fieldCellsToReveal = returnObject.fieldCellsToReveal;
        }
      });

      cellsArray = newArray;
    }

    return { newArray, isGameActive, fieldCellsToReveal };
  };

  const handleClick = (row, col, mouseButton, toPlace, isGameActive, cellsArray, cellsToReveal) => {
    row = parseInt(row, 10);
    col = parseInt(col, 10);
    let returnObject = null;
    if (mouseButton === 2 && isGameActive) {
      cellsArray = cellsArray.flat().map((cell) => {
        if (row === cell.row && col === cell.column && cell.state === 1) {
          if (cell.flag === false) {
            toPlace--;
          } else {
            toPlace++;
          }

          return { ...cell, flag: !cell.flag };
        }
        return cell;
      });

      return { cellsArray, toPlace, isGameActive, cellsToReveal };
    }

    returnObject = revealCell(row, col, cellsArray, isGameActive, cellsToReveal);

    if (returnObject.isGameActive === false) {
      returnObject.newArray = returnObject.newArray.map((cell) => {
        if (cell.bomb) {
          return { ...cell, state: 2 };
        }
        return cell;
      });
    }

    return {
      cellsArray: returnObject.newArray,
      toPlace,
      isGameActive: returnObject.isGameActive,
      cellsToReveal: returnObject.fieldCellsToReveal,
    };
  };

  const placeMines = () => {
    const newArray = [...state.fieldArray];
    for (let i = 0; i < state.mines; i++) {
      let placed = false;
      while (!placed) {
        const randomNumber = Math.floor(Math.random() * state.height * state.width);
        if (!newArray[randomNumber].bomb) {
          newArray[randomNumber].bomb = true;
          placed = true;
        }
      }
    }
    return newArray;
  };

  if (action.type === HANDLE_DIFFICULTY_BUTTON) {
    let level = null;
    if (action.payload.name === 'easy') {
      level = easy;
    }
    if (action.payload.name === 'normal') {
      level = normal;
    }
    if (action.payload.name === 'hard') {
      level = hard;
    }

    return {
      ...state,
      isModalActive: false,
      cellSize: level.cellSize,
      height: level.height,
      width: level.width,
      mines: level.mines,
      flagsToPlace: level.mines,
      startCellsToReveal: level.height * level.width - level.mines,
      cellsToReveal: level.height * level.width - level.mines,
      gameActive: false,
    };
  }

  if (action.type === GENERATE_CELLS) {
    const cellsArray = [];
    for (let i = 0; i < state.width; i++) {
      for (let j = 0; j < state.height; j++) {
        cellsArray.push({ row: i, column: j, bomb: false, state: 1, value: 0, flag: false });
      }
    }

    return { ...state, fieldArray: cellsArray };
  }

  if (action.type === PLACE_MINES) {
    return { ...state, fieldArray: placeMines() };
  }

  if (action.type === PLACE_NUMBERS) {
    return { ...state, fieldArray: placeNumbers() };
  }

  if (action.type === HANDLE_CLICK) {
    const col = action.payload.target.getAttribute('column');
    const row = action.payload.target.getAttribute('row');
    let cellsArray = [...state.fieldArray];
    let toPlace = state.flagsToPlace;
    let isGameActive = state.gameActive;
    let { cellsToReveal } = state;
    let isModal = state.isModalActive;

    const returnObject = handleClick(
      row,
      col,
      action.payload.button,
      toPlace,
      isGameActive,
      cellsArray,
      cellsToReveal,
    );
    cellsArray = returnObject.cellsArray;
    toPlace = returnObject.toPlace;
    isGameActive = returnObject.isGameActive;
    cellsToReveal = returnObject.cellsToReveal;
    if (cellsToReveal === 0) {
      isModal = true;
      isGameActive = false;
    }

    return {
      ...state,
      fieldArray: cellsArray,
      flagsToPlace: toPlace,
      gameActive: isGameActive,
      cellsToReveal,
      isModalActive: isModal,
    };
  }
  throw new Error('Unknown actions');
};

export default reducer;
