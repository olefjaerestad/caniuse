import '../common/globals';
import React from 'react';
import { App } from '../common/App';
// https://github.com/ReactTraining/react-router/issues/7015
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../common/redux/store';

/**
 * hydrate() requires server and client markup to match,
 * render() doesnt, which makes it better for dev.
 */
if (__NODE_ENV__ === 'production') { 
  hydrate(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>, 
    document.getElementById('app')
  );
} else {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>, 
    document.getElementById('app')
  );
}
