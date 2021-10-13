import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles/GlobalStyles';
import App from './App';
import { AppProvider } from './context';

ReactDOM.render(
  <>
    <GlobalStyles />
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  </>,
  document.getElementById('root'),
);
