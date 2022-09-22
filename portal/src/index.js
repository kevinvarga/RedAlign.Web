import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Portal from './Portal';
import { Provider } from 'react-redux';
import configureStore from './store';
import reportWebVitals from './reportWebVitals';
import Auth0ProviderHistory from './auth/Auth0ProviderHistory';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

const renderPortal = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Auth0ProviderHistory>
          <Provider store={store}>
            <Portal />
          </Provider>
        </Auth0ProviderHistory>
      </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./Portal', renderPortal)
}

renderPortal();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
