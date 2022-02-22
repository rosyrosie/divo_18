import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: 'border-box';
    font-family: 'SUIT';
  }
  html, body, #root{
    font-family: 'SUIT' !important;
    -webkit-user-select: none; 
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  html{
    min-height: 100%;
    display: flex;
  }
  body, #root{
    flex: 1;
    display: flex;
  }
`;

export default GlobalStyles;