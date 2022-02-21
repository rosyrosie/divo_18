import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  *{
    box-sizing: 'border-box';
    font-family: 'SUIT';
  }
  html, body, #root{
    height: 100%;
    font-family: 'SUIT' !important;
  }
`;

export default GlobalStyles;