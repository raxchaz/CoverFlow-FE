import './App.css';
import React from 'react';
import GlobalStyles from './globalStyles';
import AllRouter from '../src/router/allRouter.js';

function App() {
  return (
    <>
      <GlobalStyles />
      <AllRouter />
    </>
  );
}

export default App;
