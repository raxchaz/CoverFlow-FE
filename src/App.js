import './App.css';
import React from 'react';
import '../src/font/font.css';
import { Provider } from 'react-redux';
import store from './store';
import GlobalStyles from './globalStyles';
import AllRouter from '../src/router/allRouter.js';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AllRouter />
    </Provider>
  );
}

export default App;
