import '../src/font/font.css';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
${reset}


*{
    padding: 0;
    font-family: 'Pretendard-Regular';
}

html {
  font-family: 'Pretendard-Regular';
}

body {
  font-size: 1rem; 
}

li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

`;

export default GlobalStyles;
