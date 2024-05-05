import './App.css';
import React from 'react';
import '../src/font/font.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import GlobalStyles from './globalStyles';
import AllRouter from '../src/router/allRouter.js';
import ErrorFallback from './hooks/errorBoundary.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { alertCount } from './store/actions/alertActions.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onSuccess: (data) => {
        if (data.queryKey[0] === 'notifications') {
          const noReadElements = data.pages.reduce(
            (total, page) => total + (page.data.noReadElements || 0),
            0,
          );
          store.dispatch(alertCount(noReadElements));
        }
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <QueryClientProvider client={queryClient}>
            <AllRouter />
          </QueryClientProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
