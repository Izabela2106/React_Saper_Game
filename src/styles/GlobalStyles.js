import { createGlobalStyle } from 'styled-components';
import bomb from '../assets/bomb.svg';
import flag from '../assets/flag.svg';
import font from '../assets/DIGITALDREAM.ttf';

const GlobalStyles = createGlobalStyle`
  :root{
    --primary-color: #c0c0c0;
    --primary-color-dark: #808080;
    --alarm-color: #f80000;
    --one-color: #0200fc;
    --two-color: #017e00;
    --three-color: #ff0000;
    --four-color: #010000;
    --five-color: #7f0300;
    --six-color: #008080;
    --seven-color: #000000;
    --eight-color: #808080;


  }
  @font-face{
    font-family: DIGITALDREAM;
    src: url(${font})
    
  }


  *{
    margin:0;
    padding:0;
  }


  *::after,
  *::before{
    margin:0;
    padding:0;
    box-sizing: inherit;
  }

  .flag{
    background-image:url(${flag});

  }


  .bomb{
    background-image: url(${bomb});
    background-color: red;
  }

  .cell-1{
    color:var(--one-color);
  }
  .cell-2{
    color:var(--two-color);
  }
  .cell-3{
    color:var(--three-color);
  }
  .cell-4{
    color:var(--four-color);
  }
  .cell-5{
    color:var(--five-color);
  }
  .cell-6{
    color:var(--six-color);
  }
  .cell-7{
    color:var(--seven-color);
  }
  .cell-8{
    color:var(--eight-color);
  }

`;

export default GlobalStyles;
