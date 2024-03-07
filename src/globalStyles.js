import '../src/font/font.css';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import { StyledPage, Heading, StyledHeader } from './styledComponent';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    padding: 0;
    font-family: 'Pretendard-Regular';
		box-sizing: border-box;
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


  ${StyledPage} {
    height: 100vh;
    width: 480px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    margin: 0 auto;
    padding: 0.5%;
    overflow: auto;
  }

  ${Heading} {
    display: flex;
    justify-content: center;
    font-size: 1rem;
    margin-top: 7%;
    letter-spacing: -1px;
    font-weight: 600;
  }

  ${StyledHeader} {
    position: relative;
    display: block;
    flex-direction: row;
    margin-top: 12%;
  }
`;

export default GlobalStyles;
