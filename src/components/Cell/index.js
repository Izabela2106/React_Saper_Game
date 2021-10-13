import React from 'react';
import Wrapper from './CellWrapper';
import { useGlobalContext } from '../../context';

const Cell = ({ value, state, row, column, bomb, flag, size }) => {
  const { revealCell } = useGlobalContext();

  let classes = ['cell'];
  let cellValue = null;
  if (flag) {
    classes.push('flag');
  }
  if (state === 2) {
    classes.push('revealed');
    if (bomb) {
      classes.push('bomb');
    } else if (value === 0) {
      cellValue = '';
    } else {
      cellValue = value;
      classes.push(`cell-${value}`);
    }
  }
  classes = classes.join(' ');

  return (
    <Wrapper size={size}>
      <button
        className={classes}
        state={state}
        value={cellValue}
        row={row}
        column={column}
        onMouseDown={revealCell}
        onContextMenu={(e) => e.preventDefault()}
      >
        {cellValue}
      </button>
    </Wrapper>
  );
};

export default Cell;
