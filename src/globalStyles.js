import '../src/font/font.css';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
${reset}

*{
    padding: 0;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
}

html {
  width: 420px;
  height: 720px;
  margin-left: 33%;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

html {
  font-size: 16px;

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
