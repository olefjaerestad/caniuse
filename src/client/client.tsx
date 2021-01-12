import '../common/globals';
import React from 'react';
import { App } from '../common/App';
// https://github.com/ReactTraining/react-router/issues/7015
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate } from 'react-dom';

hydrate(
  <Router>
    <App />
  </Router>, 
  document.getElementById('app')
);
