import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: 'border-box';
    font-family: 'Gothic A1';
  }
  html, body, #root{
    height: 100%;
    font-family: 'Gothic A1' !important;
  }
`;

export default GlobalStyles;