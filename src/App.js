import './App.css';
import React from 'react';
import '../src/font/font.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import GlobalStyles from './globalStyles';
import AllRouter from '../src/router/allRouter.js';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <AllRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
