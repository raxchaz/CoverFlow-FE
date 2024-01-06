import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${reset} // 브라우저 간의 일관성을 위해 css를 초기화 

*{
    padding: 0';
    font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
}

html, body, #root{
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
