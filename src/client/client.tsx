import React from 'react';
import { App } from '../common/App';
import { hydrate } from 'react-dom';

hydrate(<App />, document.querySelector('#app'));
