import styled from 'styled-components';

const Wrapper = styled.div`
  .cell {
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    border-width: ${(props) => props.size * 0.1}px;
    cursor: pointer;
    background-color: var(--primary-color);
    background-position: center;
    background-repeat: no-repeat;
    background-size: ${(props) => props.size * 0.8}px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: #fff var(--primary-color-dark) var(--primary-color-dark) #fff;
  }
  .revealed {
    border-color: var(--primary-color-dark) #fff #fff var(--primary-color-dark);
  }

  .cell.bomb {
    background-color: var(--alarm-color);
  }
`;
export default Wrapper;
